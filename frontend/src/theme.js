import { createTheme } from "@mui/material";
import { red, green } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0276E5",
        },
        primary2: {
            main: "#8338EC",
        },
        primaryBlack: {
            main: "#2A2A2A",
        },
        secondary: {
            main: "#6A6A6A",
        },
        error: {
            main: "#FF2626",
        },
        success: {
            main: "#4CAF50",
        },
        background: {
            main: "#F2F8FD",
        },
        info: {
            main: "#F28505",
        },
        common: {
            black: "#2A2A2A",
            white: "#fff",
            red: red,
            green: green,
        },
    },
    typography: {
        fontFamily: "Poppins, sans-serif",
        h2: {
            fontWeight: 700,
            fontSize: "32px",
            "@media (max-width:600px)": {
                fontSize: "1.5rem",
            },
            "@media (max-width:960px)": {
                fontSize: "2.0rem",
            },
        },
        h1: {
            fontWeight: 700,
            fontSize: "48px",
            "@media (max-width:600px)": {
                fontSize: "2.0rem",
            },
            "@media (max-width:960px)": {
                fontSize: "2.5rem",
            },
        },
        subtitle2: {
            fontWeight: 600,
            fontSize: "1rem",
            // "@media (max-width:600px)": {
            //   fontSize: "0.6rem",
            // },
            // "@media (max-width:960px)": {
            //   fontSize: "0.8rem",
            // },
        },
        h3: {
            fontWeight: 600,
            fontSize: "24px",
            // "@media (max-width:600px)": {
            //   fontSize: "1.3rem",
            // },
            // "@media (max-width:960px)": {
            //   fontSize: "1.6rem",
            // },
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.25rem",
            // "@media (max-width:600px)": {
            //   fontSize: "0.9rem",
            // },
            // "@media (max-width:960px)": {
            //   fontSize: "1.25rem",
            // },
        },
        h5: {
            fontWeight: 500,
            fontSize: "1rem",
            // "@media (max-width:600px)": {
            //   fontSize: "0.6rem",
            // },
            // "@media (max-width:960px)": {
            //   fontSize: "0.8rem",
            // },
        },
        body1: {
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "0.875rem",
            // "@media (max-width:600px)": {
            //   fontSize: "0.5rem",
            // },
            // fontWeight: 500,
            // fontSize: "0.875rem",
            // "@media (max-width:600px)": {
            //   fontSize: "0.5rem",
            // },
        },
        body2: {
            fontWeight: 500,
            fontSize: "0.875rem",
            // "@media (max-width:600px)": {
            //   fontSize: "0.5rem",
            // },
        },
        caption: {
            fontFamily: "DM Sans",
            fontWeight: "400",
            fontSize: "0.85rem",
            // "@media (max-width:600px)": {
            //   fontSize: "0.6rem",
            // },
        },
        subtitle: {
            fontWeight: 600,
            fontSize: "1.25rem",
            // "@media (max-width:600px)": {
            //   fontSize: "0.8rem",
            // },
            // "@media (max-width:960px)": {
            //   fontSize: "1rem",
            // },
        },
        date: {
            fontWeight: 600,
            fontSize: "0.85rem",
        },
        date_head: {
            fontWeight: 600,
            fontSize: "0.5rem",
        },
        Preveiw_h1: {
            fontFamily: "Open Sans",
            fontWeight: "700",
            fontSize: "28px",
            initialLetter: "-0.5px",
            letterSpacing: "-0.5px",
        },
        Preveiw_h2: {
            fontFamily: "Open Sans",
            fontWeight: "700",
            fontSize: "16px",
            initialLetter: "-0.5px",
            letterSpacing: "-0.5px",
        },
        Preveiw_h3: {
            fontFamily: "Open Sans",
            fontWeight: "700",
            fontSize: "11px",
            initialLetter: "-0.5px",
            letterSpacing: "-0.5px",
        },
        Preveiw_h4: {
            fontFamily: "Open Sans",
            fontWeight: "600",
            fontSize: "20px",
            initialLetter: "-0.5px",
            letterSpacing: "-0.5px",
        },
        Preveiw_h5: {
            fontFamily: "Open Sans",
            fontWeight: "600",
            fontSize: "12px",
        },
        Preveiw_h6: {
            fontFamily: "Open Sans",
            fontWeight: "500",
            fontSize: "8px",
            lineHeight: "normal",
        },

        Preveiw_body1: {
            fontFamily: "Open Sans",
            fontWeight: "600",
            fontSize: "12px",
            initialLetter: "-0.5px",
            letterSpacing: "-0.5px",
        },
        Preveiw_body2: {
            fontFamily: "'Open Sans','Open Sans','Open Sans','Open Sans'",
            fontWeight: "600",
            fontSize: "14px",
            initialLetter: "-0.5px",
            letterSpacing: "-0.5px",
        },
        Preveiw_subtitle1: {
            fontFamily: "Inter",
            fontWeight: "400",
            fontSize: "14px",
            initialLetter: "-2%",
        },
        Preveiw_subtitle2: {
            fontFamily: "Open Sans",
            fontWeight: "400",
            fontSize: "16px",
            initialLetter: "-2%",
            letterSpacing: "-0.5px",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.size === "large" && {
                        padding: "10px 16px 10px 16px",
                        gap: "4px",
                        height: "44px",
                        fontSize: "1rem",
                        fontFamily: "Poppins ",
                        fontWeight: 600,
                        alignContent: "center",
                        // "@media (max-width:600px)": {
                        //   fontSize: "0.6rem",
                        //   height: "28px",
                        //   padding: "5px 8px 5px 8px",
                        // },
                        // "@media (max-width:960px)": {
                        //   fontSize: "0.8rem",
                        //   height: "35px",
                        //   padding: "7px 10px 7px 10px",
                        // },
                    }),
                    ...(ownerState.size === "medium" && {
                        padding: "7px 12px",

                        height: "2.25rem",
                        fontSize: "14px",
                        fontFamily: "Poppins ",
                        fontWeight: 500,
                        alignContent: "center",
                        boxSizing: "border-box",
                        // "@media (max-width:600px)": {
                        //   fontSize: "0.5rem",
                        //   padding: "4px 8px",
                        //   height: "1.25rem",
                        //   boxSizing: "border-box",
                        // },
                        // "@media (max-width:960px)": {
                        //   fontSize: "0.65rem",
                        //   padding: "5px 10px",
                        //   height: "1.75rem",
                        //   boxSizing: "border-box",
                        // },
                    }),
                    ...(ownerState.size === "small" && {
                        padding: "4px 8px",

                        height: "1.8125rem",
                        fontSize: "0.875rem",
                        fontFamily: "Poppins ",
                        fontWeight: 500,
                        alignContent: "center",
                        // "@media (max-width:600px)": {
                        //   fontSize: "0.5rem",
                        //   padding: "2px 4px",
                        //   height: "1.4rem",
                        // },
                        // "@media (max-width:960px)": {
                        //   fontSize: "0.65rem",
                        //   padding: "3px 6px",
                        //   height: "1.6rem",
                        // },
                    }),
                    textTransform: "none",
                    borderRadius: "4px",
                }),
            },
        },

        // MuiInputBase: {
        //   styleOverrides: {
        //     root: {
        //       "@media (max-width:600px)": {
        //         "& input:focus": {
        //           outline: "none",
        //         },
        //       },
        //     },
        //   },
        // },
        MuiTextField: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    ...(ownerState.size === "medium" && {
                        boxSizing: "border-box",
                        backgroundcolor: "#FFFFFF",
                        height: "44px",
                        "@media (max-width:600px)": {
                            height: "28px",
                        },
                        "@media (max-width:960px)": {
                            height: "35px",
                            padding: "4px auto",
                        },
                    }),
                }),
            },
        },

        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    padding: "11.8px 8px",
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    "&.MuiOutlinedInput-root": {
                        padding: "0px 8px"
                    }
                }
            }
        },

        // MuiFormControl:{
        //   styleOverrides:{
        //     root:{
        //       height:"44px",
        //       padding:"8px 6px"
        //     }
        //   }
        // },

        MuiSwitch: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 18,
                    padding: 0,
                    display: "flex",
                    "&:active": {
                        "& .MuiSwitch-thumb": {
                            width: 16,
                        },
                        "& .MuiSwitch-switchBase.Mui-checked": {
                            transform: "translateX(9px)",
                        },
                    },
                    "& .MuiSwitch-switchBase": {
                        padding: 2,
                        "&.Mui-checked": {
                            transform: "translateX(12px)",
                            color: "#fff",
                            "& + .MuiSwitch-track": {
                                opacity: 1,
                                // backgroundColor: "#177ddc",
                            },
                        },
                    },
                    "& .MuiSwitch-thumb": {
                        boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
                        width: 14,
                        height: 13,
                        borderRadius: 6,
                        // transition: theme.transitions.create(["width"], {
                        //   duration: 200,
                        // }),
                    },
                    "& .MuiSwitch-track": {
                        borderRadius: 18 / 2,
                        opacity: 1,
                        backgroundColor: "lightGrey",
                        boxSizing: "border-box",
                    },
                },
            },
        },

        MuiTypography: {
            styleOverrides: {
                root: {
                    color: "#2A2A2A",
                },
            },
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    outline: "none",
                },
            },
        },

        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: "#0276E5",
                    fontWeight: 500,
                    minWidth: "110px",
                    flexShrink: 0,
                    flexGrow: 1,
                    flexBasis: "13%",
                    fontSize: "0.875rem",
                    letterSpacing: "-2%",
                    padding: "0.5rem",
                    // "@media (max-width:600px)": {
                    //   fontSize: "0.5rem",
                    // },
                },
                body: {
                    color: "#2A2A2A",
                    fontWeight: 500,
                    flexShrink: 0,
                    flexGrow: 1,
                    flexBasis: "13%",
                    fontSize: "0.875rem",
                    letterSpacing: "-2%",
                    padding: "0.5rem",
                    // "@media (max-width:600px)": {
                    //   fontSize: "0.5rem",
                    // },
                },
            },
        },
        MuiTableSortLabel: {
            styleOverrides: {
                head: {
                    color: "#0276E5",
                    fontWeight: 500,
                    minWidth: "110px",
                    flexShrink: 0,
                    flexGrow: 1,
                    flexBasis: "13%",
                    fontSize: "0.875rem",
                    letterSpacing: "-2%",
                    // "@media (max-width:600px)": {
                    //   fontSize: "0.5rem",
                    // },
                },
            },
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
                },
            },
        },
        // MuiTableBody: {
        //     styleOverrides: {
        //         root: {
        //             marginTop: "10px"
        //         }
        //     }
        // },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    borderBottomColor: "white",
                },
            },
        },

        MuiTable: {
            styleOverrides: {
                root: {
                    borderCollapse: "separate ",
                    borderSpacing: "0px 15px ",
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: "2px 4px 16px -5px rgba(2, 118, 229, 0.10)",
                    borderRadius: "8px",
                    border: "1px solid #FBFBFB",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({ ownerState }) => ({
                    borderRadius: "0px",
                    backgroundcolor: ownerState.color === "primary" ? "white" : "inherit",
                    color: ownerState.color === "primary" ? "black" : "inherit",
                }),
            },
        },
        MuiDrawer: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
                },
            },
        },
        MuiSwipeableDrawer: {
            styleOverrides: {
                root: {
                    borderRadius: "0px",
                },
            },
        },
    },
});

export default theme;
