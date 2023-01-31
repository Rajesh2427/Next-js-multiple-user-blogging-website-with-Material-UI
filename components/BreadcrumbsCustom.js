import { Breadcrumbs, Link, Typography } from "@mui/material"

const BreadcrumbsCustom = (...crumbs) => {
    // console.log(crumbs)
    const breadcrumbs = crumbs
    // console.log(breadcrumbs)
  return (
    
    <Breadcrumbs separator='>' aria-label="breadcrumbs">
    <Link underline='hover' href="/" >
    <Typography fontWeight='bold' variant="body2">Home</Typography>
    </Link>
    {breadcrumbs ? breadcrumbs.map(item => {
        return (
            <Link underline='hover' href={`/${item.link}`}>
            <Typography fontWeight='bold' variant="body2">{ item.name}</Typography>
            </Link>
               )
             }) : null}
    
    
  </Breadcrumbs>
  )
}

export default BreadcrumbsCustom