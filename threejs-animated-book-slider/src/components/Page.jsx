import { useMemo, useRef, useState } from 'react';
import {Bone, BoxGeometry, Color, Float32BufferAttribute, MathUtils, MeshStandardMaterial, Skeleton, SkinnedMesh, SRGBColorSpace, Uint16BufferAttribute, Vector3} from 'three'
import {useCursor, useTexture} from '@react-three/drei'
import { pageAtom, pages } from './UI';
import { useFrame } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils.js';
import { easing } from 'maath';
import { useAtom } from 'jotai';

const LERP_FACTOR = 0.001;
const EASING_FACTOR = 0.5;
const EASING_FACTOR_FOLD = 0.3;
const INSIDE_CURVE_STRENGTH = 0.18;
const OUTSIDE_CURVE_STRENGTH = 0.05;
const TURNING_CURVE_STRENGTH = 0.09;

const PAGE_WIDTH =  1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.002;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(PAGE_WIDTH, PAGE_HEIGHT, PAGE_DEPTH, PAGE_SEGMENTS, 2)

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0)

const whiteColor = new Color("white");
const pageMaterials = [
    new MeshStandardMaterial({
        color: whiteColor,
    }),
    new MeshStandardMaterial({
        color: '#111'
    }),
    new MeshStandardMaterial({
        color: whiteColor    
    }),
    new MeshStandardMaterial({
        color: whiteColor
    })
];

const position = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndices = [];
const skinWeights = [];

for(let i = 0; i < position.count; i++){
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;
    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

    skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute( 'skinIndex', new Uint16BufferAttribute(skinIndices, 4));
pageGeometry.setAttribute('skinWeight', new Float32BufferAttribute(skinWeights, 4));

pages.forEach(page => {
    useTexture.preload(`/textures/${page.front}.jpg`);
    useTexture.preload(`/textures/${page.back}.jpg`);
    useTexture.preload(`/textures/book-back.jpg`)
})

const Page = ({number, front, back, page, opened, bookClosed, ...props}) => {
    const [picture, picture2, pictureRoughness] = useTexture([`/textures/${front}.jpg`,
        `/textures/${back}.jpg`,
        ...(number === 0 || number === pages.length - 1 ?
            [`/textures/book-back.jpg`]
            : []
        ) 
    ])

    picture.colorSpace = picture2.colorSpace = SRGBColorSpace;

    const manualSkinnedMesh = useMemo(() => {
        const bones = [];
        for(let i = 0; i <= PAGE_SEGMENTS; i++){
            const bone = new Bone();
            bones.push(bone);
            if(i === 0 ) {
                bone.position.x = 0;
            } else {
                bone.position.x = SEGMENT_WIDTH;
            }
            if(i > 0) {
                bones[i - 1].add(bone);
            }
        }
        const skeleton = new Skeleton(bones)
        const materials = [...pageMaterials, 
            new MeshStandardMaterial({
                color: whiteColor,
                map: picture,
                ...(number === 0 ?
                    {
                        roughnessMap: pictureRoughness
                    }:
                    {
                        roughness: 0.1
                    }
                )
            }),
            new MeshStandardMaterial({
                color: whiteColor,
                map: picture2,
                ...(number === pages.length - 1 ?
                    {
                        roughnessMap: pictureRoughness
                    }:
                    {
                        roughness: 0.1
                    }
                )
            })
        ];
        const mesh = new SkinnedMesh(pageGeometry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        mesh.add(skeleton.bones[0])
        mesh.bind(skeleton)

        return mesh;
    }, [])

    const group = useRef()
    const skinnedMeshRef = useRef()
    const lastOpened = useRef(opened)
    const turnedAt = useRef(0)

    useFrame((_, delta) => {
        if(!skinnedMeshRef.current) {
            return;
        }

        if(lastOpened.current !== opened) {
            turnedAt.current = +new Date();
            lastOpened.current = opened;
        }
    
        let turningTime = Math.min(400, ( new Date() - turnedAt.current)) / 400;
        turningTime = Math.sin(turningTime * Math.PI)

        const bones = skinnedMeshRef.current.skeleton.bones;

        let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
        
        if(!bookClosed){
            targetRotation += degToRad(number * 0.8);
        }

        for(let i = 0 ; i < bones.length; i++) {
            const target = i === 0 ? group.current : bones[i];

            const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.3) : 0;
            const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
            const turningCurveIntensity = Math.sin(i * Math.PI * (1 / bones.length)) * turningTime ;

            let rotationAngle = INSIDE_CURVE_STRENGTH * insideCurveIntensity * targetRotation - outsideCurveIntensity * OUTSIDE_CURVE_STRENGTH * targetRotation 
            + TURNING_CURVE_STRENGTH * turningCurveIntensity * targetRotation;

            let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

            if(bookClosed) {
                rotationAngle = i === 0 ? targetRotation : 0
                foldRotationAngle = 0;
            }
            
            easing.dampAngle(
                target.rotation,
                'y',
                rotationAngle,
                EASING_FACTOR,
                delta
            )

            const foldIntensity = i > 8 ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime : 0;

            easing.dampAngle(
                target.rotation,
                'x',
                foldRotationAngle * foldIntensity,
                EASING_FACTOR_FOLD,
                delta
            )
        }
    })

    const [highlight, setHighlight] = useState(false)
    useCursor(highlight)
    const [p, setPage] = useAtom(pageAtom);

    return (
        <group ref={group} {...props}
            onPointerEnter={e => {
                e.stopPropagation();
                setHighlight(true)
            }}
            onPointerLeave={e => {
                e.stopPropagation();
                setHighlight(false)
            }}
            onClick={e => {
                e.stopPropagation();
                setPage(opened ? number : number + 1)
            }}
        >
            <primitive object={manualSkinnedMesh} ref={skinnedMeshRef} 
            position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}/>
        </group>
    );
}

export default Page;