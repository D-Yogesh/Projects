import {Card, CardHeader, CardContent, Typography} from '@material-ui/core'
import {Doughnut} from 'react-chartjs-2'
import useStyles from './styles'
import useTransactions from '../../useTransactions'
import { ArcElement, Chart } from 'chart.js'
Chart.register(ArcElement)

const Details = ({title}) => {
    const classes = useStyles()
    const {total, chartData} = useTransactions(title)
    console.log({title, chartData})
    return (
        <Card className={classes[title.toLowerCase()]}>
            <CardHeader title={title}/>
            <CardContent>
                <Typography variant='h5'>${total}</Typography>
                <Doughnut data={chartData}/>
            </CardContent>
        </Card>
    )
}
export default Details