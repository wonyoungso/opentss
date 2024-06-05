import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
 
function epanechnikov(bandwidth) {
  return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
}

function kde(kernel, thresholds, data) {
  return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
}


const RentToNetIncomeRatioCriterion = (props) => {

  let notNullDocuments = _.filter(props.screeningDocuments, sd => !_.isNull(sd.rent_to_netincome_ratio));
  let rtniData = _.map(notNullDocuments, sd => sd.rent_to_netincome_ratio);
  let rtniApplicantData = _.map(notNullDocuments, sd => sd.calculated_rtni);
  const thresholds = _.range(100)
  const densityRTNI = kde(epanechnikov(4), thresholds, rtniData)
  const densityRTNIApplicant = kde(epanechnikov(4), thresholds, rtniApplicantData)

  const densityRTNIData = _.map(densityRTNI, d => {
    return {x: d[0], "Property RTNI": d[1]};
  });
  const densityRTNIDataApplicant = _.map(densityRTNIApplicant, d => {
    return {x: d[0], "Applicant RTNI": d[1]};
  });

  const numberOfAcceptedReports = _.size(_.filter(props.screeningDocuments, { "rtni_accepted": true }));
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        Rent-to-net-income Ratio (RTNI) 
      </div>

      <div className="text-right">
        <div className="text-sm">
          Acceptance Rate<sup>*</sup>
        </div>
        <div className="text-4xl font-bold text-sat-blue">
          {Math.round(acceptanceRate)}%
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          margin={{
            top: 0,
            right:0,
            left: 0,
            bottom: 0
          }}

        >
          <XAxis data={densityRTNIData} dataKey="x" type="number"  />
          <Area data={densityRTNIData} type="monotone" dataKey="Property RTNI" stroke="none" fill="#607EE3" stroke="#5855e4" />
          <Area data={densityRTNIDataApplicant} type="monotone" dataKey="Applicant RTNI" stroke="none" fill="#DD6D3D" stroke="#DD6D3D" />

          <Legend verticalAlign="top" height={36}/>
        </AreaChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify rent-to-net-income ratio, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default RentToNetIncomeRatioCriterion;


