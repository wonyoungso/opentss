import { Report } from "@mui/icons-material";
import * as React from "react";
import { useRef, useEffect, useState, Fragment } from "react";
import {scaleLinear, max } from 'd3';
import _ from 'lodash';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';


const ReportStats = (props) => {
  const creditScoreVizEl = useRef(null);
  const { report_statistic } = props;
  const round = (number, decimalPlaces) => {
    const factorOfTen = Math.pow(10, decimalPlaces)
    return Math.round(number * factorOfTen) / factorOfTen
  }

  const housingTypeScaler = scaleLinear()
    .domain([0, max(_.values(report_statistic.housing_type), (value) => value.accepted + value.denied)])
    .range([0, 100]);

  console.log(report_statistic.rti_dist.accepted)

  return (
    <div className="pt-10 lg:grid lg:grid-cols-6 lg:gap-5">

      <div className="text-sm">Reports Statistics</div>
      <div className="lg:col-span-2 text-right ">
        <span className="text-xs uppercase"># of Tenant Screening Report Collected</span><br/>
        <span className="text-8xl font-bold">{ report_statistic.total }</span>
      </div>
      <div className="text-right text-sm">

        <span className="text-xs uppercase">Avg Security Deposit</span><br/>
        <span className="text-8xl font-bold">{ round(report_statistic.avg_security_deposit, 1) }</span><br/>
        <span className="text-xs uppercase">Months of Rent</span>
        
      </div>

      <div className="text-right">
        <span className="text-xs uppercase">Credit score</span>

        <ResponsiveContainer width="100%" height={150}>
            <AreaChart
              margin={{
                top: 0,
                right:0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="x" type="number" domain={[400, 800]} ticks={[450, 600, 800]} />

              <Area type="monotone" 
                data={report_statistic.credit_score_dist.accepted} dataKey="value" stroke="none" fill="#607EE3" />
              <Area type="monotone" 
                data={report_statistic.credit_score_dist.denied} dataKey="value" stroke="none" fill="#FF7721" />
            </AreaChart>
          </ResponsiveContainer>
      </div>

      <div className="text-right text-sm">
        <span className="text-xs uppercase">Rent-to-income ratio</span>
        <ResponsiveContainer width="100%" height={150}>
            <AreaChart
              margin={{
                top: 0,
                right:0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="x" type="number" />

              <Area type="monotone" 
                data={report_statistic.rti_dist.accepted} dataKey="value" stroke="none" fill="#607EE3" />
              <Area type="monotone" 
                data={report_statistic.rti_dist.denied} dataKey="value" stroke="none" fill="#FF7721" />
            </AreaChart>
          </ResponsiveContainer>
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

        <span className="text-xs uppercase">Accepted</span><br/>
        <span className="text-8xl font-bold text-accepted">{ report_statistic.accepted_cnt }</span>

      </div>

      <div className="text-right text-sm">

        <span className="text-xs uppercase">Denied</span><br/>
        <span className="text-8xl font-bold text-denied">{ report_statistic.denied_cnt }</span>
        
      </div>

      <div className="text-right text-sm">
        <span className="text-xs uppercase">Housing Type</span>
        <div className="pb-2"></div>
        {
          _.map(report_statistic.housing_type, (value, key) => {
            return (
              <div className="pb-2" key={key}>
                <div className="flex justify-between">
                  <div className="text-sm">
                    { key }
                  </div>
                  <div className="text-sm">
                    { value.accepted + value.denied }
                  </div>
                </div>
                <div className="relative py-1">
                  <div className="absolute w-full border-b-4 border-b-white-op-30"></div>
                  <div className="absolute border-b-4 border-b-accepted" style={{width: `${housingTypeScaler(value.accepted)}%`}}></div>
                  <div className="absolute border-b-4 border-b-denied" style={{width: `${housingTypeScaler(value.denied)}%`, left: `${housingTypeScaler(value.accepted)}%`}}></div>
                </div>
              </div>
            )
          })
        }
       

      </div>


      <div className="text-right text-sm">

        <span className="text-xs uppercase">Monthly Estd Debts</span>

        
        <ResponsiveContainer width="100%" height={150}>
            <AreaChart
              margin={{
                top: 0,
                right:0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="x" type="number"  />

              <Area type="monotone" 
                data={report_statistic.monthly_debt_dist.accepted} dataKey="value" stroke="none" fill="#607EE3" />
              <Area type="monotone" 
                data={report_statistic.monthly_debt_dist.denied} dataKey="value" stroke="none" fill="#FF7721" />
            </AreaChart>
          </ResponsiveContainer>

      </div>

      <div className="text-right text-sm">
        <span className="text-xs uppercase">Debt-to-income Ratio</span>
        <ResponsiveContainer width="100%" height={150}>
            <AreaChart
              margin={{
                top: 0,
                right:0,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="x" type="number" />

              <Area type="monotone" 
                data={report_statistic.dti_dist.accepted} dataKey="value" stroke="none" fill="#607EE3" />
              <Area type="monotone" 
                data={report_statistic.dti_dist.denied} dataKey="value" stroke="none" fill="#FF7721" />
            </AreaChart>
          </ResponsiveContainer>

      </div>
      
      <div className="lg:col-span-6 pb-10">

      </div>
    </div>
  )
};

export default ReportStats;