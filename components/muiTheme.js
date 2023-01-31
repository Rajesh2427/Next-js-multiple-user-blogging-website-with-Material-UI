
import { createTheme } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";


 let muiTheme = createTheme(
    {
        palette:{
           primary:{
            light:deepOrange[50],
            main:deepOrange[600],

           },
           secondary:{
            
            light:grey[200],
            main: grey[800],
            dark:grey[900]
           }
        },
        typography:{
            h1:{
                fontSize:'32px',
                fontWeight:'bold',
                letterSpacing:'-1px',
                margin:'5px'
            },
            h2:{
                fontSize:'22px',
                fontWeight:'bold',
                letterSpacing:'-1px',
                margin:'5px',
                
            },
            h3:{
                fontSize:'15px',
                fontWeight:'normal',
                letterSpacing:'0px',
                margin:'5px'
            },

        }
        
    }
 
)

export default muiTheme;