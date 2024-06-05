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


const MinimumCreditScoreCriterion = (props) => {

  let notNullDocuments = _.filter(props.screeningDocuments, sd => !_.isNull(sd.minimum_credit_score));
  let data = _.map(notNullDocuments, sd => sd.minimum_credit_score);
  const bandwidth = 30; // Bandwidth for KDE
  const thresholds = d3.ticks(...d3.nice(...d3.extent(data), 5), 60)
  const density = kde(epanechnikov(bandwidth), thresholds, data)
  const densityData = _.map(density, d => {
    return {x: d[0], y: d[1]};
  });
  const numberOfAcceptedReports = _.size(_.filter(props.screeningDocuments, sd => { return sd.minimum_credit_score_accepted == true; }));
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        Minimum Credit Score
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
          <XAxis dataKey="x" type="number" domain={[350, 850]}/>
          <Area type="monotone" dataKey="y" stroke="none" fill="#607EE3" stroke="#5855e4" />
          <ReferenceLine x={props.criteria.credit_score} label={{
            value: 'Your Score',
            position: 'insideTopLeft',
            fill: '#DD6D3D'
          }} stroke="#DD6D3D" />

        </AreaChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify a minimum credit score, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default MinimumCreditScoreCriterion;


