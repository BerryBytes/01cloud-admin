import React from "react";
import { Grid, Card, CardContent } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function CicdCardSkeleton() {
    return(
        <SkeletonTheme height={250}>
            <Card className="m-b-20">
                <CardContent>
                    <Grid>
                        <Grid container alignItems="center">
                            <Grid item md={1} >
                                <Skeleton circle={true} height={50} width={50} variant='circle' />
                            </Grid>
                            <Grid item md={10}>
                                <Grid>
                                    <Grid container alignItems="center" >
                                        <Grid item md={10}>
                                            <Grid>
                                                <Grid container>
                                                    <Grid item md={12} xs={12}>
                                                        <Skeleton animation="wave" height={10} width="20%" />
                                                    </Grid>

                                                    <Grid item md={12} xs={12}>
                                                        <Skeleton animation="wave" height={10} width="40%" />
                                                    </Grid>
                                                    <Grid item md={12}>
                                                        <Grid>
                                                            <Grid container>
                                                                <Grid item md={4} xs={6}>
                                                                    <Skeleton animation="wave" height={10} width="50%" />
                                                                </Grid>
                                                                <Grid item md={3} xs={6}>
                                                                    <Skeleton animation="wave" height={10} width="50%" />
                                                                </Grid>
                                                                <Grid item md={3} xs={6}>
                                                                    <Skeleton animation="wave" height={10} width="50%" />
                                                                </Grid>
                                                                <Grid item md={2} xs={6}>
                                                                    <Skeleton animation="wave" height={10} width="50%" />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={2}>
                                            
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </SkeletonTheme>
    );
}