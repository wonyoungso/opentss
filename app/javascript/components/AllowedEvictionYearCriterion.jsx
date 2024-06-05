import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, ReferenceLine, Bar, BarChart } from 'recharts';
 
function epanechnikov(bandwidth) {
  return x => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
}

function kde(kernel, thresholds, data) {
  return thresholds.map(t => [t, d3.mean(data, d => kernel(t - d))]);
}


const AllowedEvictionYearCriterion = (props) => {

  let notNullDocuments = _.filter(props.screeningDocuments, sd => {
    return !_.isNull(sd.tenant_can_eviction_years) || !_.isNull(sd.tenant_can_eviction_judgment_years)
  });

  let evictionData = _.map(notNullDocuments, sd => sd.tenant_can_eviction_years);
  let judgmentData = _.map(notNullDocuments, sd => sd.tenant_can_eviction_judgment_years);
  const thresholds = _.range(10)
  const densityEviction = kde(epanechnikov(2), thresholds, evictionData)
  const densityJudgment = kde(epanechnikov(2), thresholds, judgmentData)

  const densityEvictionData = _.map(densityEviction, d => {
    return {x: d[0], "Eviction Years": d[1]};
  });
  const densityJudgmentData = _.map(densityJudgment, d => {
    return {x: d[0], "Eviction Judgment Years": d[1]};
  });



  const numberOfAcceptedReports = _.size(_.filter(props.screeningDocuments, sd => { return sd.eviction_years_accepted == true; }));
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        Allowed Eviction Year
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
        <AreaChart
          margin={{
            top: 0,
            right:0,
            left: 0,
            bottom: 0
          }}

        >
          <XAxis data={densityEvictionData} dataKey="x" type="number"  />
          <YAxis />
          <Area data={densityEvictionData} type="monotone" dataKey="Eviction Years" stroke="none" fill="#607EE3" stroke="#5855e4" />
          <Area data={densityJudgmentData} type="monotone" dataKey="Eviction Judgment Years" stroke="#208174" fill="#3bb9a9" />
          {
            props.criteria.most_recent_eviction > 0 ?
            <ReferenceLine x={props.criteria.most_recent_eviction} label={{
              value: 'You',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }

          <Legend verticalAlign="top" height={36}/>
        </AreaChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify allowed eviction years, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default AllowedEvictionYearCriterion;


