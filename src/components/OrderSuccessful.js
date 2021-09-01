import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import jsPDF from 'jspdf'
import Button from '@material-ui/core/Button';
import html2canvas from 'html2canvas';
import { Grid } from '@material-ui/core';
import  AppBar  from './homepage/AppBar';
const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 200,
  },
  topDiv:{
    [theme.breakpoints.up('xs')]: {
        position:'relative',
        width:'100%',
        height:'4rem'
    },
    [theme.breakpoints.up('sm')]: {
        position:'relative',
        width:'100%',
        height:'6rem'
    },
    
  },
  button:{
    [theme.breakpoints.up('xs')]: {
        float:'right',marginRight:"10px",backgroundColor:"#fb641b",color:"white"
    },
    [theme.breakpoints.up('sm')]: {
        marginTop:"10px",marginLeft:'auto',marginRight:'100px',backgroundColor:"#fb641b",color:"white",float:"right"
    },
    }
}));


export default function SpanningTable() {
  const classes = useStyles();
  const [order,setOrder] = useState(JSON.parse(localStorage.getItem('order')))
  const [imgData,setImgData] = useState();
  const generatePdf = ()=>{
      var doc = new jsPDF("p","pt","a1");
      doc.html(document.querySelector("#content"),{
          callback:function(doc){
              doc.save("OrderDetails.pdf")
          }
      })
       /*  var pdf = new jsPDF();
        console.log("gg")
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf"); */
  }
  useEffect(()=>{
   
  },[order])
  const printDocument = ()=> {
    const input = document.getElementById('content');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('img/png');
        const pdf = new jsPDF("p","pt","a4");
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0,width,height);
        pdf.save("download.pdf");
      })
    ;
  }
  return (
      <div>
        <AppBar title='Order Successful' page = 'OrderSuccessful' />
        <div className={classes.topDiv}>
            </div>
        <Button variant="contained" className={classes.button} onClick = {printDocument}>
            Download bill
        </Button>

      <Grid container>
            <div id="content" style={{marginTop:"25px"}}>
            <Typography  variant="h5"   align='center'  noWrap>
                    Address Details
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                    <TableRow>
                        <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>Detail Name</TableCell>
                        <TableCell align="right" style={{ fontWeight: 750,fontStyle:'normal'}}>Value</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>Id</TableCell>
                            <TableCell align="right">{order.data.placeOrder.order.id}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>Name</TableCell>
                            <TableCell align="right">{order.data.placeOrder.order.name}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>Phone No</TableCell>
                            <TableCell align="right">{order.data.placeOrder.order.phoneNo}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>Pincode</TableCell>
                            <TableCell align="right">{order.data.placeOrder.order.pincode}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>State</TableCell>
                            <TableCell align="right">{order.data.placeOrder.order.state}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>City</TableCell>
                            <TableCell align="right">{order.data.placeOrder.order.city}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>House no, Building name</TableCell>
                            <TableCell align="right">{order.data.placeOrder.order.houseNo}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>Roadname,Area,Colony</TableCell>
                            <TableCell align="right">{order.data.placeOrder.order.colony}</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>Time</TableCell>
                            <TableCell align="right">{order.data.placeOrder.order.time}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{height:"50px"}}>
                
            </div>
            <Typography  variant="h5"   align='center'  noWrap>
                    Order Details
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center"  style={{ fontWeight: 750,fontStyle:'normal'}} colSpan={3}>
                            Details
                        </TableCell>
                        <TableCell align="center"  style={{ fontWeight: 750,fontStyle:'normal'}} colSpan={3}>Price</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ fontWeight: 750,fontStyle:'normal'}}>Product</TableCell>
                        <TableCell align="right" style={{ fontWeight: 750,fontStyle:'normal'}}>Pkt count</TableCell>
                        <TableCell align="right" style={{ fontWeight: 750,fontStyle:'normal'}}>Carton count</TableCell>
                        <TableCell align="right" style={{ fontWeight: 750,fontStyle:'normal'}}>Price per pkt</TableCell>
                        <TableCell align="right" style={{ fontWeight: 750,fontStyle:'normal'}}>Price per carton</TableCell>
                        <TableCell align="right" style={{ fontWeight: 750,fontStyle:'normal'}}>Sum</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {order.data.placeOrder.order.orderList.map((row) => (
                        <TableRow hover key={row.desc}>
                        <TableCell>{row.productDetail.productName}</TableCell>
                        <TableCell align="right">{row.pktCount}</TableCell>
                        <TableCell align="right">{row.cartonCount}</TableCell>
                        <TableCell align="right">{row.productDetail.pricePkt}</TableCell>
                        <TableCell align="right">{row.productDetail.priceCarton}</TableCell>
                        <TableCell align="right">{(Number(row.productDetail.pricePkt)*Number(row.pktCount)) +
                        (Number(row.productDetail.priceCarton)*Number(row.cartonCount))}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell style={{ fontWeight: 750,fontStyle:'normal'}} colSpan={4} align="right">Total</TableCell>
                        <TableCell align="right" colSpan={3}>{Number(order.data.placeOrder.order.total)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ fontWeight: 750,fontStyle:'normal'}} colSpan={4} align="right">Discount</TableCell>
                        <TableCell colSpan={1} align="right">{order.data.placeOrder.order.discountPercent}%</TableCell>
                        <TableCell align="right" colSpan={1} >{(Number(order.data.placeOrder.order.total)-((Number(order.data.placeOrder.order.discountPercent)/100)*Number(order.data.placeOrder.order.total)))}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ fontWeight: 750,fontStyle:'normal'}} colSpan={4} align="right">Final Total</TableCell>
                        <TableCell align="right" colSpan={3}>{Number(order.data.placeOrder.order.total)-(Number(order.data.placeOrder.order.total)-((Number(order.data.placeOrder.order.discountPercent)/100)*Number(order.data.placeOrder.order.total)))}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
      </Grid>
      </div>
  );
}
