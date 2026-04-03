import React, { useState, useEffect } from "react";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Grid,
	Select,
	FormControl,
	MenuItem,
	Typography,
	IconButton,
	Tooltip,
	Collapse,
	Divider,
} from "@material-ui/core";
import clsx from "clsx";
import { connect } from "react-redux";
import { getDnsList } from "../dns/redux/actions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { setupClusterDNS } from "./redux/actions";
import ConfirmActionPopup from "../../components/confirmactionpopup/ConfirmActionPopup";
import EditIcon from "@material-ui/icons/Edit";
import { getDateInStandardFormat } from "../../helpers/utils";
import AddDNSPopup from "../../components/adddnspopup/AddDNSPopup";
import { makeStyles } from "@material-ui/styles";
import CheckCircleSharpIcon from "@material-ui/icons/CheckCircleSharp";
import KeyValueRow from "../../components/keyvaluerow/KeyValueRow";

const useStyles = makeStyles((theme) => ({
	editIcon: {
		border: "2px dashed"
	},
	expand: {
		transform: "rotate(0deg)",
		transition: theme?.transitions?.create("transform",{
			duration: theme?.transitions?.duration?.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
	cardHeader:{
		padding: "0 !important"
	},
	dnsEditIcon: {
		marginTop: "8px !important",
		marginRight: "8px !important",
	},
}));

const ClusterDNS = (props) => {
	const [updateDnsPopup, setUpdateDnsPopup] = useState(false);
	const [selectedDns, setSelectedDns] = useState(0);
	const [editDns, setEditDns] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [appliedDns, setAppliedDns] = useState(null)
	const [expanded, setExpanded] = useState(false);

	const classes = useStyles();

	useEffect(() => {
		props.getDnsList();
	}, []);

	useEffect(() => {
		if(!props.dnsId){
			setExpanded(true)
		}
	}, [props.dnsId]);

	useEffect(() => {
		if (props.dnsList && props.dnsList.length > 0 && props.dnsId) {
			let _dns = props.dnsList.find((dns) => dns.id === props.dnsId);
			if (_dns) {
				setSelectedDns(_dns.id);
				setAppliedDns(_dns);
			}
		}
	}, [props.dnsList]);

	const updateDnsDisagreeHandler = () => {
		setUpdateDnsPopup(false);
	};

	const updateDnsAgreeHandler = () => {
		if (props.packagesInstalled) return;
		let jsonBody = new FormData();
		jsonBody.append("dns_id", selectedDns);
		props.setupClusterDNS(
			props.clusterId,
			jsonBody,
			props.mainClusterId,
			updateDnsDisagreeHandler
		);
	};

	const handleSetupClick = () => {
		setUpdateDnsPopup(true);
	};

	const handleDnsChange = (e) => {
		setSelectedDns(e.target.value);
	};

	const handleEditIconClick = () => {
		setEditDns(!editDns);
	};

	const isSetupValid = () => {
		let valid = true;
		if (props.packagesInstalled) valid = false;
		else if (selectedDns === 0 || selectedDns === props.dnsId)
			valid = false;
		return !valid;
	};

	const handleCreateClick = () => {
		setOpenPopup(true);
	};

	const handleClosePopup = () => {
		setOpenPopup(false);
	};

	return (
		<>
			<Card className="m-t-20">
				<CardHeader
				className={classes.cardHeader}
					title={
						<Typography varaint="h5" display="inline">
							<strong> DNS Details </strong>{" "}
							
								<IconButton disabled style={{opacity: props?.dnsId > 0 ? "1" : "0" }}>
									<CheckCircleSharpIcon
									fontSize="12"
									style={{ color: "green" }}
									/>
								</IconButton>	
							
						</Typography>}
					subheader ={
						<Typography display="block" className="m-b-5" variant="caption"> DNS s required for creating CNAME.{" "} </Typography>
					}
					avatar={
						<IconButton
							className={clsx(classes.expand, {
								[classes.expandOpen]: expanded,
						})}
						onClick={() => {
							setExpanded(!expanded);
						}}
						>
							<ExpandMoreIcon />
						</IconButton>
					}
					action={
						(props.packagesInstalled || props.destroyed || !props.dnsId || props.dnsId <= 0) ? (
							<></> 
						) : (
							expanded &&
							<Tooltip className={classes.dnsEditIcon} title={editDns ? "Cancel edit": "Edit"} placement="left">
								<IconButton
									onClick={handleEditIconClick}
									className={editDns ? classes.editIcon : ""}
								>
									<EditIcon />
								</IconButton>
							</Tooltip>
						)
					}
				/>
				<Collapse in={expanded}>
					<Divider />
					<br />
					{(!props.packagesInstalled && !props.destroyed) && (!props.dnsId || props.dnsId <= 0 || editDns) ? (
						<CardContent>
							<Grid
								container
								spacing={2}
								alignItems="center"
								justify="flex-start"
								sm={10}
								md={6}
							>
								<Grid item sm={8} xs={12}>
									<FormControl
										error={""}
										variant="outlined"
										fullWidth
										margin="normal"
									>
										<Select
											color="primary"
											value={selectedDns ?? 0}
											onChange={(e) => handleDnsChange(e)}
											MenuProps={{
												getContentAnchorEl: null,
												anchorOrigin: {
													vertical: "bottom",
													horizontal: "left",
												},
											}}
											disabled={props.packagesInstalled}
										>
											<MenuItem value={0}>
												Select DNS
											</MenuItem>
											{props.dnsList &&
												props.dnsList.length > 0 &&
												props.dnsList.map((_dns, index) => (
													<MenuItem
														value={_dns.id}
														key={index}
													>
														{_dns.name}
													</MenuItem>
												))}
										</Select>
									</FormControl>
								</Grid>
								<Grid item sm={4} xs={6}>
									<Button
										onClick={handleCreateClick}
										color="primary"
										variant="contained"
										size="large"
										className="w-100"
										
									>
										Add DNS
									</Button>
								</Grid>
								<Grid item xs={5} sm={5} md={4}>
									<Button
										onClick={handleSetupClick}
										color="primary"
										variant="contained"
										disabled={isSetupValid()}
										size="large"
										className="w-100"
									>
										Apply
									</Button>							
								</Grid>
							</Grid>
						</CardContent>
					) : (
						<CardContent>
							{appliedDns ? (
								<>
									<KeyValueRow keyXs={3} rowKey={"Name"} rowValue={appliedDns?.name  ?? ""} />
									<KeyValueRow keyXs={3} rowKey={"Created"} rowValue={ appliedDns.createdat ? getDateInStandardFormat(
										appliedDns.createdat
										) : ""}
									/>
									<KeyValueRow keyXs={3} rowKey={"Provider"} rowValue={appliedDns?.provider  ?? ""} />
									{appliedDns.region && (
										<KeyValueRow keyXs={3} rowKey={"Region"} rowValue={appliedDns?.region  ?? ""} />
									)}
									<KeyValueRow keyXs={3} rowKey={"Base domain"} rowValue={appliedDns?.base_domain  ?? ""} />
								</>
							) : (
								<Grid><Typography variant="caption">No Dns details were found for this cluster!</Typography></Grid>
							)}
						</CardContent>
					)}
				</Collapse>
			</Card>
			<ConfirmActionPopup
				open={updateDnsPopup}
				message={`Are you sure you want to update cluster DNS?`}
				handleAgree={updateDnsAgreeHandler}
				handleDisAgree={updateDnsDisagreeHandler}
				loading={props.updatingDNS}
				yesText={"Update"}
			/>
			{openPopup && (
				<AddDNSPopup
					openPopup={openPopup}
					handleClosePopup={handleClosePopup}
				/>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	updatingDNS: state.ClusterReducer.updatingDNS,
	dnsList: state.DnsReducer.dnsList,
});

const mapDispatchtoProps = (dispatch) => {
	return {
		getDnsList: () => dispatch(getDnsList()),
		setupClusterDNS: (id, jsonBody, mainClusterId, callback) =>
			dispatch(setupClusterDNS(id, jsonBody, mainClusterId, callback)),
	};
};

export default connect(mapStateToProps, mapDispatchtoProps)(ClusterDNS);
