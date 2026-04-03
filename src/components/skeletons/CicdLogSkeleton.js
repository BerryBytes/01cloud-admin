import React from "react";
import { Grid } from '@material-ui/core';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function CicdLogSkeleton() {
    return(
        <SkeletonTheme height={250}>
            <Grid className="step">
                <Grid container alignItems="center">
                    <Grid item md={1}>
                        <Skeleton circle={true} height={25} width={25} variant='circle' />
                    </Grid>
                    <Grid item md={9}>
                        <Skeleton animation="wave" height={10} width="20%" />
                    </Grid>
                    <Grid item md={1} >
                        <Skeleton animation="wave" height={10} width="20%" />
                    </Grid>
                    <Grid item md={1} >
                        <Skeleton animation="wave" height={10} width="20%" />
                    </Grid>
                </Grid>
            </Grid>
        </SkeletonTheme>
    );
}