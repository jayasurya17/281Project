import React, { Component } from 'react';
import './generateBill.css';
import axios from 'axios';
import constants from '../../../utils/constants';

class Landing extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        axios.get(`${constants.BACKEND_SERVER.URL}`)
            .then((response) => {
                console.log(response.data)
            })
    }

    render() {
        return (
            <body>
                <div class="container" id="invoice">
                    <div>
                        <div class="class1" > <img src="helmet.png" height="240"
                            width="450" />
                        </div>
                        <div class="class2" ><b>
                            <pre align="right">         SJSU           1 Washington Sq</pre>
                            <pre align="right">(925)623-6605      San Jose, California</pre>
                            <pre align="right">                                  95110</pre>
                            <pre align="right"> United States</pre></b>
                        </div>
                        {/* <div style="clear: left;" /> */}
                    </div>
                    {/* <b>
                        <div style="float:left; margin-top: 50px; margin-left: 50px;">
                            <pre><b style="color:blue">                                      </b></pre>
                            <pre>Jayasurya Pinaki                 04/15/2020                 0000001
                            CMPE281
328 N Market St                  <b style="color:blue">Due Date                   Reference</b>
San Jose, California        	 04/29/2020                 AWSMTaaS
95110
United States</pre>
                        </div>
                    </b>
                    <div style="float:right;margin-top:50px; margin-right:50px; font-size: 18px;">
                        <pre><b style="color:blue">Amount Due (USD)</b></pre>
                        <h1 align="right" id="amt_due1">$170</h1>
                    </div>
                    <div style="clear: left;" />
                    <hr style="border-bottom:4px solid #1a10e7;padding-top:50px; margin-right:50px">

                        <div style="margin-right:50px; font-size: 18px;">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th style="padding-left:415px">Rate</th>
                                        <th>Qty </th>
                                        <th>Line Total</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td id=" descrption1"><b>AWS-EC2 Instance</b></td>
                                        <p>t2.micro(Utilization-70%)</p>

                                        <td style="padding-left:400px" id="price1"><b>14.00</b></td>
                                        <td class="text-right" id="qty1"><b>5</b></td>
                                        <td class="text-right" id="linetotal1"><b>$14</b></td>

                                    </tr>
                                    <tr>
                                        <td id="descrption2"><b>AWS-S3 Buckets</b>
                                            <p id="number_of_file_uploads">Number of file uploads-6</p>
                                        </td>
                                        <td style="padding-left:400px" id="price2"><b>12.00</b></td>
                                        <td class="text-right" id="qty2"><b>3</b></td>
                                        <td class="text-right" id="linetotal2"><b>12</b></td>
                                    </tr>
                                    <tr>
                                        <td id="descrption3"><b>AWS-Device Farm</b>
                                            <p id="number_of_devices_in_pool">Number of Devices in pool-12</p>
                                            <p id="aws_number_of_runs">Number of runs-4</p>
                                        </td>
                                        <td style="padding-left:400px" id="price3"><b>24.00</b></td>
                                        <td class="text-right" id="qty3"><b>2</b></td>
                                        <td class="text-right" id="linetotal3"><b>14</b></td>
                                    </tr>
                                    <tr>
                                        <td id="descrption4"><b>CloudWatch Monitoring</b>
                                            <p>Alarms and log reports</p>
                                        </td>
                                        <td style="padding-left:400px" id="price4"><b>6.00</b></td>
                                        <td class="text-right" id="qty4"><b>1</b></td>
                                        <td class="text-right" id="linetotal4"><b>$6</b></td>
                                    </tr>
                                    <tr>
                                        <td id="descrption5"><b>Tester Fee</b>
                                            <p id="tester_number_of_runs"> Number_of runs-4</p>
                                        </td>
                                        <td style="padding-left:400px" id="price5"><b>20.00</b></td>
                                        <td class="text-right" id="qty5"><b>1</b></td>
                                        <td class="text-right" id="linetotal5"><b>$14</b></td>
                                    </tr>
                                    <tr>
                                        <td id="descrption6"><b>Platform Usage</b></td>
                                        <td style="padding-left:400px" id="price6"><b>10.00</b></td>
                                        <td class="text-right" id="qty6"><b>2</b></td>
                                        <td class="text-right" id="linetotal6"><b>$14</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style="float:right;margin-right:50px;margin-top:30px">
                            <table class="table">
                                <tr class="text-right">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td><b>Subtotal</b></td>

                                    <td id="subtot"><b>$1000.00</b></td>
                                </tr>
                                <tr class="text-right">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td><b>7.5% Discount</b></td>
                                    <td id="discount"><b>$1000.00</b></td>
                                </tr>
                                <tr class="text-right">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td><b>Tax</b></td>
                                    <td id="tax"><b>$1000.00</b></td>
                                </tr>
                                <tr class="text-right">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td><b>Total</b></td>
                                    <td id="total"><b>$1000.00</b></td>
                                </tr>
                                <tr class="text-right">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td><b>Amount Paid</b></td>
                                    <td id="amt_paid"><b>0.00</b></td>
                                </tr>
                                <tr class="text-right">
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td><b style="color:blue">Amount Due (USD)</b></td>
                                    <td id="amt_due"><b>$1000.00</b></td>
                                </tr>


                            </table>
                        </div>
                        <div style="float:left;">
                            <p style="padding-top:310px;color:blue"><b>Terms</b></p>
                            <p>Please pay by 04/29/2020 to avoid penalty</p>
                        </div>
                        <div style="clear: left;" />
                    </hr> */}
                </div>
            </body>
        )
    }

}
//export Landing Component
export default Landing;