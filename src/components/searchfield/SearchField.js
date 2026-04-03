import React from 'react'
import { InputAdornment, IconButton, TextField } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";

export default function SearchField(props) {
    const [timer, setTimer] = React.useState(null)

    React.useEffect(() => {
        return (() => {
            if (timer) {
                clearTimeout(timer)
            }
        })
    }, [])

    const handleSearch = (st) => {
        if (props.handleSearch) {
            props.handleSearch(st)
        }
    }

    const handleSearchChange = (e) => {
        if (timer) {
            clearTimeout(timer)
        }
        props.handleSearchChange(e.target.value)
        setTimer(setTimeout(handleSearch, 1000, e.target.value))
    }

    return (
        <>
            <TextField
                className="w-100"
                id="search"
                label={props.label ?? "Search"}
                name="search"
                style={{ width: "100%", marginTop: 8 }}
                color="primary"
                onChange={(e) => handleSearchChange(e)}
                value={props.search}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" edge="end">
                                <SearchIcon size="small" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                data-test="search-box"
            />
        </>
    )
}