import React from 'react';
import { Tooltip, Typography } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton'
import { getDiffDays, getDateInStandardFormat } from '../../helpers/utils'
import { useTranslation } from 'react-i18next'

export const DateHandler = (props) => {
    const [t] = useTranslation()
    return (
            <div data-test="date-container" style={{display: "flex", alignItems: "center"}}>
                <Tooltip title={t('Projects.LoadbalancerInfo.createdLabel')} arrow data-test="tool-tip">
                    {props.icon}
                </Tooltip>
                <span className="topinfoGrid" title={getDateInStandardFormat(props.date)} data-test="top-info">
                    <Typography color="textPrimary" variant="body2" style={ !props.inProjectInfo ? {fontSize: "14px"} : {}} >{props.date ? `${getDiffDays(props.date, true)}` : <Skeleton width={80} />}</Typography>
                </span>
            </div>
    )
}
