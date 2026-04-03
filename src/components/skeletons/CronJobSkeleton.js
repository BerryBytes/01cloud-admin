import React from "react";
import { Grid, Card, CardContent } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function CronJobSkeleton() {
    return (
        <SkeletonTheme height={250}>
            <Card className="m-b-20 w-100">
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid item md="10">
                            <Grid container spacing={1}>
                                <Grid item md={12} xs={12}>
                                    <Skeleton animation="wave" height={10} width="50%" />
                                </Grid>
                                <Grid item md={12}>
                                    <Grid container spacing={3}>
                                        <Grid item md={3} xs={6}>
                                            <Skeleton animation="wave" height={10} width="50%" />
                                        </Grid>
                                        <Grid item md={3} xs={6} >
                                            <Skeleton animation="wave" height={10} width="50%" />
                                        </Grid>
                                        <Grid item md={3} xs={6} >
                                            <Skeleton animation="wave" height={10} width="50%" />
                                        </Grid>
                                        <Grid item md={3} xs={6} >
                                            <Skeleton animation="wave" height={10} width="50%" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md="1" className="center">
                            <Skeleton animation="wave" height={10} width="50%" />
                        </Grid>
                        <Grid item md="1" className="center">
                            <Skeleton animation="wave" height={10} width="50%" />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </SkeletonTheme>

    );
}