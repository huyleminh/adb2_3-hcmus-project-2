import React from "react";
import { useParams } from "react-router-dom"

InvoiceDetail.propTypes = {}

function InvoiceDetail() {
    const { id } = useParams();
    //1, 'hxiaob46', '697621414', '0706576651', N'Stuart Vi', '373-3720 Mi St.'
    return (<div>Invoice {id} detail</div>);
}

export default InvoiceDetail;