
class ReportStatistic < ApplicationRecord
  belongs_to :company
  validates :company_id, :presence => true, :uniqueness => true

  def self.bandwidth_silverman(data)
    n = data.size
    iqr = data.sort[n / 4..-n / 4].reduce(&:-).abs * 1.349
    (0.9 * [iqr, ReportStatistic.standard_deviation(data)].min / n ** 0.2).to_f
  end

  def self.standard_deviation(data)
    n = data.size
    mean = data.sum / n.to_f
    variance = data.map { |x| (x - mean) ** 2 }.sum / (n - 1).to_f
    Math.sqrt(variance)
  end
  

  def init_dummies!

    self.accepted_cnt = rand(30..60)
    self.denied_cnt = rand(30..60)
    self.total = self.accepted_cnt + self.denied_cnt
    self.avg_security_deposit = rand(1.5..3)
    self.housing_type = {
      "Single Family": { "accepted": rand(0..self.accepted_cnt), "denied": rand(0..self.denied_cnt) },
      "Townhouse": { "accepted": rand(0..self.accepted_cnt), "denied": rand(0..self.denied_cnt) },
      "Multifamily":  { "accepted": rand(0..self.accepted_cnt), "denied": rand(0..self.denied_cnt) },
      "Manufactured": { "accepted": rand(0..self.accepted_cnt), "denied": rand(0..self.denied_cnt) },
      "Other":  { "accepted": rand(0..self.accepted_cnt), "denied": rand(0..self.denied_cnt) }
    }


    accepted_credit_scores = ReportStatistic.generate_normal_samples(680, 50, self.accepted_cnt)
    denied_credit_scores = ReportStatistic.generate_normal_samples(580, 50, self.denied_cnt) 
    min_credit_score = [accepted_credit_scores.min, denied_credit_scores.min].min
    max_credit_score = [accepted_credit_scores.max, denied_credit_scores.max].max
    
    bandwidth_credit_score = ReportStatistic.bandwidth_silverman(accepted_credit_scores + denied_credit_scores)
    self.credit_score_dist = {
      "accepted": ReportStatistic.kernel_density_estimation(accepted_credit_scores, bandwidth_credit_score, min_credit_score, max_credit_score),
      "denied": ReportStatistic.kernel_density_estimation(denied_credit_scores, bandwidth_credit_score, min_credit_score, max_credit_score)
    }



    accepted_rti = ReportStatistic.generate_normal_samples(30, 20, self.accepted_cnt)
    denied_rti = ReportStatistic.generate_normal_samples(50, 20, self.denied_cnt) 
    min_rti = [accepted_rti.min, denied_rti.min].min
    max_rti = [accepted_rti.max, denied_rti.max].max

    bandwidth_rti = ReportStatistic.bandwidth_silverman(accepted_rti + denied_rti)
    
    self.rti_dist = {
      "accepted": ReportStatistic.kernel_density_estimation(accepted_rti, bandwidth_rti, min_rti, max_rti),
      "denied": ReportStatistic.kernel_density_estimation(denied_rti, bandwidth_rti, min_rti, max_rti)
    }


  

    accepted_monthly_debt = ReportStatistic.generate_normal_samples(500, 200, self.accepted_cnt)
    denied_monthly_debt = ReportStatistic.generate_normal_samples(1500, 200, self.denied_cnt)
    min_monthly_debt = [accepted_monthly_debt.min, denied_monthly_debt.min].min
    max_monthly_debt = [accepted_monthly_debt.max, denied_monthly_debt.max].max

    bandwidth_monthly_debt = ReportStatistic.bandwidth_silverman(accepted_monthly_debt + denied_monthly_debt)

    self.monthly_debt_dist = {
      "accepted": ReportStatistic.kernel_density_estimation(accepted_monthly_debt, bandwidth_monthly_debt, min_monthly_debt, max_monthly_debt),
      "denied": ReportStatistic.kernel_density_estimation(denied_monthly_debt, bandwidth_monthly_debt, min_monthly_debt, max_monthly_debt)
    }


    accepted_dti = ReportStatistic.generate_normal_samples(20, 10, self.accepted_cnt)
    denied_dti = ReportStatistic.generate_normal_samples(50, 10, self.denied_cnt)
    min_dti = [accepted_dti.min, denied_dti.min].min
    max_dti = [accepted_dti.max, denied_dti.max].max
    bandwidth_dti = ReportStatistic.bandwidth_silverman(accepted_dti + denied_dti)

    self.dti_dist = {
      "accepted": ReportStatistic.kernel_density_estimation(accepted_dti, bandwidth_dti, min_dti, max_dti),
      "denied": ReportStatistic.kernel_density_estimation(denied_dti, bandwidth_dti, min_dti, max_dti)
    }

    self.save(validate: false)

  end

  def conv_to_json
    {
      id: self.id,
      accepted_cnt: self.accepted_cnt,
      denied_cnt: self.denied_cnt,
      total: self.total,
      avg_security_deposit: self.avg_security_deposit,
      housing_type: self.housing_type,
      credit_score_dist: self.credit_score_dist,
      rti_dist: self.rti_dist,
      monthly_debt_dist: self.monthly_debt_dist,
      dti_dist: self.dti_dist
    }
  end


  def self.kernel_density_estimation(data, bandwidth, x_min, x_max)

    ticks_count = 40
    tick_step = (x_max - x_min) / ticks_count
    thresholds = (x_min..x_max).step(tick_step)
    bandwidth = bandwidth.present? ? bandwidth : 4

    density = []
    
    thresholds.each do |t|
      cell = {}
      cell[:x] = t

      summed_value = 0
      data.each do |d|
        x = (t - d) / bandwidth
        epanechnikoved_value = x.abs <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0
        summed_value = summed_value + epanechnikoved_value
      end

      cell[:value] = summed_value / data.size
      density << cell
    end

    density
  end



  def self.generate_normal_samples(m, sd, n)
    normal_samples = []
    normal = Distribution::Normal.rng(m, sd)
    n.times do
      normal_samples << normal.call
    end
  
    normal_samples
  end
  
end
