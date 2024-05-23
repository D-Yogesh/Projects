import { Card, CardContent, Typography, Divider, CardHeader, Grid } from "@material-ui/core"
import Form from "./Form/Form"

import useStyles from './styles'
import History from "./History/History"

const Main = () => {
    const classes = useStyles()
    return (
        <div>
            <Card className={classes.roo}>
                <CardHeader title={"Expense Tracker"} subheader="Powered by speechly"/>
                <CardContent>
                    <Typography align="center" variant="h5">
                        Total Balance Rs.100
                    </Typography>
                    <Typography variant="subtitle1" style={{lineHeight: '1.5em', marginTop: '20px'}}>
                        {/* Info card */}
                        Try saying: Add income for Rs.100 in category salary for Monday...
                    </Typography>
                    <Divider/>
                    <Form/>
                </CardContent>
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <History/>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </div>
    )
}
export default Main