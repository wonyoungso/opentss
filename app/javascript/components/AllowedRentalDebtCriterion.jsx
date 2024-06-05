import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Bar, BarChart } from 'recharts';
 
function epanechnikov(bandwidth) {
  return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
}

function kde(kernel, thresholds, data) {
  return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
}


const AllowedRentalDebtCriterion = (props) => {

  let notNullDocuments = _.filter(props.screeningDocuments, sd => !_.isNull(sd.allowable_amount_rental_debt));
  let data = _.map(notNullDocuments, sd => sd.allowable_amount_rental_debt);
  // const bandwidth = 300; // Bandwidth for KDE
  // const thresholds = d3.ticks(...d3.nice(...d3.extent(data), 5), 60)
  // const density = kde(epanechnikov(bandwidth), thresholds, data)
  // const densityData = _.map(density, d => {
  //   return {x: d[0], y: d[1]};
  // });

  const bins = d3.bin()
      .thresholds(10)
      .value((d) => d)
    (data);

  const numberOfAcceptedReports = _.size(_.filter(props.screeningDocuments, sd => { return sd.allowed_rental_debt_accepted == true; }));
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        Allowed Rental Debt
      </div>

      <div className="text-right">
        <div className="text-sm">
          Acceptance Rate<sup>*</sup>
        </div>
        <div className="text-4xl font-bold text-sat-blue">
          {acceptanceRate.toFixed(1)}%
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          margin={{
            top: 0,
            right:0,
            left: 0,
            bottom: 0
          }}

          data={bins}
        >
          <XAxis dataKey="x0" type="number" />
          <YAxis />
          <Bar dataKey="length" stroke="none" fill="#607EE3" stroke="#5855e4" />
          <ReferenceLine x={props.criteria.rental_debt} label={{
            value: 'Your Rental Debt',
            position: 'insideTopLeft',
            fill: '#DD6D3D'
          }} stroke="#DD6D3D" />

        </BarChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify allowed rental debt amount, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default AllowedRentalDebtCriterion;


