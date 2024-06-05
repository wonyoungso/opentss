import * as React from "react";
import { useContext, useEffect, useState, Fragment } from "react";
import _ from 'lodash';
import * as d3 from 'd3';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, BarChart, Bar, Cell} from 'recharts';
 
const NoCriminalCriterion = (props) => {

  let notNullDocuments = _.filter(props.screeningDocuments, sd => {
    return !_.isNull(sd.criminal_no_arrest) || 
           !_.isNull(sd.criminal_no_charge_misdeam) || 
           !_.isNull(sd.criminal_no_charge_felony) || 
           !_.isNull(sd.criminal_no_conviction_misdeam) || 
           !_.isNull(sd.criminal_no_conviction_felony)
  });
  
  const noArrestNumber = _.filter(notNullDocuments, sd => { return sd.criminal_no_arrest == true; }).length;
  const noChargeMisdeamNumber = _.filter(notNullDocuments, sd => { return sd.criminal_no_charge_misdeam == true; }).length;
  const noChargeFelonyNumber = _.filter(notNullDocuments, sd => { return sd.criminal_no_charge_felony == true; }).length;
  const noConvictionMisdeamNumber = _.filter(notNullDocuments, sd => { return sd.criminal_no_conviction_misdeam == true; }).length;
  const noConvictionFelonyNumber = _.filter(notNullDocuments, sd => { return sd.criminal_no_conviction_felony == true; }).length;

  const data = [
    {
      name: "No Arrsts",
      value: noArrestNumber
    },
    {
      name: "No Chrgd Msdmnr",
      value: noChargeMisdeamNumber
    },
    {
      name: "No Chrgd Flny",
      value: noChargeFelonyNumber
    },
    {
      name: "No Cnvctd Msdmnr",
      value: noConvictionMisdeamNumber
    },
    {
      name: "No Cnvctd Flny",
      value: noConvictionFelonyNumber
    },
  ]
  
  const colors = {
    "No Arrsts": ["#607EE3", "#5855e4"], 
    "No Chrgd Msdmnr": ["#607EE3", "#5855e4"], 
    "No Chrgd Flny": ["#607EE3", "#5855e4"], 
    "No Cnvctd Msdmnr": ["#607EE3", "#5855e4"], 
    "No Cnvctd Flny": ["#607EE3", "#5855e4"], 
  };
  const numberOfAcceptedReports = _.filter(props.screeningDocuments, sd => { return sd.no_criminal_accepted == true; }).length;
  const acceptanceRate = numberOfAcceptedReports / props.screeningDocuments.length * 100;

  return (
    <div className="lg:col-span-2">
      <div className="font-bold pb-2">
        No Criminal Records
      </div>

      <div className="text-right">
        <div className="text-sm">
          Acceptance Rate<sup>*</sup>
        </div>
        <div className="text-4xl font-bold text-sat-blue">
          {acceptanceRate.toFixed(1)}%
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          margin={{
            top: 0,
            right:0,
            left: 0,
            bottom: 50
          }}

          data={data}
        >
          <XAxis dataKey="name" angle={-20}
            dx={15}
            dy={20}
            minTickGap={-200} />
          <YAxis />
          <Bar dataKey="value">
            {
              data.map((entry, index) => {
                return (
                  <Cell key={`cell-${index}`} fill={colors[entry.name][0]} stroke={colors[entry.name][1]} />
                );
              })
              
            }
          </Bar>
          {/* {
            props.criteria.criminal_history_been_arrested == "yes" ?
            <ReferenceLine x="No Arrsts" label={{
              value: 'These would not accept you',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }

          {
            props.criteria.criminal_history_charged_misdemeanor == "yes" ?
            <ReferenceLine x="No Chrgd Msdmnr" label={{
              value: 'These would not accept you',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }

          {
            props.criteria.criminal_history_charged_felony == "yes" ?
            <ReferenceLine x="No Chrgd Flny" label={{
              value: 'These would not accept you',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }

          {
            props.criteria.criminal_history_convicted_misdemeanor == "yes" ?
            <ReferenceLine x="No Cnvctd Msdmnr" label={{
              value: 'These would not accept you',
              position: 'insideTopLeft',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          }

          {
            props.criteria.criminal_history_convicted_felony == "yes" ?
            <ReferenceLine x="No Cnvctd Flny" label={{
              value: 'These would not accept you',
              position: 'insideTopRight',
              fill: '#DD6D3D'
            }}  stroke="#DD6D3D" /> : null
          } */}
          
        </BarChart>
      </ResponsiveContainer>

      <div className="text-xs">
        <sup>*</sup>If a screening criteria document does not specify no evictions, this tool assumes that the property accepts you.
      </div>
    </div>
  )
};

export default NoCriminalCriterion;