import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell} from 'recharts';
 
const NoEvictionCriterion = (props) => {

  let notNullDocuments = _.filter(props.screeningDocuments, sd => {
    return !_.isNull(sd.tenant_no_eviction) || !_.isNull(sd.tenant_no_eviction_judgment)
  });
  
  const noEvictionNumber = _.filter(notNullDocuments, sd => { return sd.tenant_no_eviction == true; }).length;
  const noEvictionJudgementNumber = _.filter(notNullDocuments, sd => { return sd.tenant_no_eviction_judgment == true; }).length;

  const data = [
    {
      name: "No Any Evctns",
      value: noEvictionNumber
    },
    {
      name: "No Evct Judgmnts",
      value: noEvictionJudgementNumber
    }
  ]

  const colors = {
    "No Any Evctns": ["#607EE3", "#5855e4"], // Red color for "No Open Collections"
    "No Evct Judgmnts": ["#607EE3", "#5855e4"],
    "N/A":["#AAAAAA", "#999999"] // Green color for "N/A"
  };
  const numberOfAcceptedReports = _.filter(props.screeningDocuments, sd => { return sd.no_eviction_accepted == true; }).length;
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        No Evictions
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

          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="value">
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.name][0]} stroke={colors[entry.name][1]} />
              ))
            }
          </Bar>
          {
            (props.criteria.eviction_history_had_judgments == "yes" ||
             props.criteria.eviction_history_had_eviction_case_dismissed == "yes") ?
            <ReferenceLine x="No Any Evctns" label={{
              value: 'These would not accept you',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }

          {
            props.criteria.eviction_history_had_judgments == "yes" &&
            props.criteria.eviction_history_had_eviction_case_dismissed != "yes" ?
            <ReferenceLine x="No Evct Judgmnts" label={{
              value: 'These would not accept you',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }
          
        </BarChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify no evictions, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default NoEvictionCriterion;


