import {Paper, Box} from '@mui/material';
function Skeleton() {
  return (
    <Box sx={{width:'100%',height:300}}>
        <Paper elevation={4}sx={{height:200}}>
        </Paper>
        <Box sx={{height: 100, display:'flex',justifyContent:'space-between'}}>
            <Box  sx={{width:70,height:70,mt:2}}>
                <Paper elevation={4}sx={{height:'100%',width:'100%', borderRadius:"50%"}}>
                </Paper>
            </Box>
            <Paper elevation={4} sx={{width:"70%",mt:1}}>
            </Paper>
        </Box>

    </Box>
  )
}

export default Skeleton