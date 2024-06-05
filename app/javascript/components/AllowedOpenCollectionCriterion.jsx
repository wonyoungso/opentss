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


const AllowedOpenCollectionCriterion = (props) => {

  let notNullDocuments = _.filter(props.screeningDocuments, sd => !_.isNull(sd.allowable_amount_open_collections));
  let data = _.map(notNullDocuments, sd => sd.allowable_amount_open_collections);
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

  const numberOfAcceptedReports = _.size(_.filter(props.screeningDocuments, sd => { return sd.allowable_amount_open_collections_accepted == true; }));
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        Allowed Open Collections Amount
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
          <XAxis dataKey="x0" type="number" domain={[-500, 6000]} ticks={[0, 1500, 3500, 6000]} />
          <Bar dataKey="length" stroke="none" fill="#607EE3" stroke="#5855e4" />
          <YAxis />
          <ReferenceLine x={props.criteria.collections} label={{
            value: 'Your Collections',
            position: 'insideTopLeft',
            fill: '#DD6D3D'
          }} stroke="#DD6D3D" />

        </BarChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify allowed open collections amount, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default AllowedOpenCollectionCriterion;


