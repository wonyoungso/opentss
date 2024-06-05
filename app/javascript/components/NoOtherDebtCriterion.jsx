import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell} from 'recharts';
 
const NoOtherDebtCriterion = (props) => {

  let notNullDocuments = _.filter(props.screeningDocuments, sd => !_.isNull(sd.no_other_debts));
  let total = _.filter(notNullDocuments, sd => { return sd.no_other_debts == true; }).length;
  const data = [
    {
      name: "No Other Debts",
      value: total
    },
    {
      name: "N/A",
      value: props.screeningDocuments.length - total
    }
  ]

  const colors = {
    "No Other Debts": ["#607EE3", "#5855e4"], // Red color for "No Rental Debt"
    "N/A":["#AAAAAA", "#999999"] // Green color for "N/A"
  };
  const numberOfAcceptedReports = _.filter(props.screeningDocuments, sd => { return sd.no_other_debt_accepted == true; }).length;
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        No Other Debts
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
            props.criteria.other_debts > 0 ?
            <ReferenceLine x="No Other Debts" label={{
              value: 'These would not accept you',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }
          
        </BarChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify no rental debt, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default NoOtherDebtCriterion;


