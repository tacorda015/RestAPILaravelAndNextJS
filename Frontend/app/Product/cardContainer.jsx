import { Card, CardContent, Typography, Grid } from '@mui/material';

const CardList = ({ typeCounts }) => {
    return (
        <Grid container spacing={1}>
            {typeCounts.map((typeData, index) => (
            <Grid key={index} item xs={6} sm={3} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card style={{ width: '100%', height: '96px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {typeData.typeName}
                        </Typography>
                        <Typography color="textSecondary">
                            Count: {typeData.count}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
    );
}

export default CardList;
