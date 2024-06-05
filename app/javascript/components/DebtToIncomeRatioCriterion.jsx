import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
 
function epanechnikov(bandwidth) {
  return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
}

function kde(kernel, thresholds, data) {
  return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
}

const DebtToIncomeRatioCriterion = (props) => {

  let mcsNotNullDocuments = _.filter(props.screeningDocuments, sd => !_.isNull(sd.minimum_credit_score));
  let data = _.map(mcsNotNullDocuments, sd => sd.debt_to_income_ratio);
  const bandwidth = 17; // Bandwidth for KDE
  const thresholds = _.range(20, 100, 1);
  const density = kde(epanechnikov(bandwidth), thresholds, data)
  const densityData = _.map(density, d => {
    return {x: d[0], y: d[1]};
  });
  const numberOfAcceptedReports = _.filter(props.screeningDocuments, sd => { return sd.dti_accepted == true; }).length;
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  const debtToIncomeRatio = (props.criteria.monthly_debt_service) / (props.criteria.monthly_income) * 100;
  console.log("debtToIncomeRatio", debtToIncomeRatio);
  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        Debt-to-income Ratio (DTI)
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

          data={densityData}
        >
          <XAxis dataKey="x" type="number" domain={[0, 100]}/>
          <Area type="monotone" dataKey="y" stroke="none" fill="#607EE3" stroke="#5855e4" />
          <ReferenceLine x={debtToIncomeRatio} label={{
            value: 'Your DTI',
            position: 'insideTopLeft',
            fill: '#DD6D3D'
          }} stroke="#DD6D3D" />

        </AreaChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify a debt-to-income ratio, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default DebtToIncomeRatioCriterion;


