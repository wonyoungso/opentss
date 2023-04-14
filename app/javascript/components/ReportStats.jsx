import { Report } from "@mui/icons-material";
import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";

const ReportStats = (props) => {
  return (
    <>
      <div className="text-sm">Reports Statistics</div>
      <div className="lg:col-span-2 text-right text-sm">
        # of Tenant Screening Report Collected<br/>
        55
      </div>
      <div className="text-right text-sm">
        Avg Security Deposit<br/>
        1.5<br/>
        Months of Rent
      </div>

      <div className="text-right text-sm">
        Credit score
      </div>

      <div className="text-right text-sm">
        Rent-to-income ratio
      </div>

      <div>

      </div>
      
      <div className="lg:col-span-2 border-b border-dashed border-b-dark-blue">

      </div>


      <div className="border-b border-dashed border-b-dark-blue">

      </div>


      <div className="lg:col-span-2 border-b border-dashed border-b-dark-blue">

      </div>
      
      <div>

      </div>
      <div className="text-right text-sm">
        Accepted<br/>
        23
      </div>

      <div className="text-right text-sm">
        Denied<br/>
        32
      </div>

      <div className="text-right text-sm">
        Landlord Scale (# of Units)
      </div>


      <div className="text-right text-sm">
        Monthly Estd Debts
      </div>

      <div>
      </div>
      
      <div className="lg:col-span-6 pb-10">

      </div>
    </>
  )
};

export default ReportStats;