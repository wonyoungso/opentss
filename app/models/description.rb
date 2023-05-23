require 'cgi'

class Description < ApplicationRecord
  has_rich_text :content
  has_many :companies_descriptions
  has_many :companies, :through => :companies_descriptions

  def conv_to_json
    {
      company_name: self.companies.first.name,
      company_id: self.companies.first.id,
      id: self.id,
      title: self.title,
      subtitle: self.subtitle,
      desc_type: self.desc_type,
      content: self.content_as_html
    }
  end

  def content_as_html

    doc = Nokogiri::HTML.fragment(self.content.body.to_s)

    doc.css('action-text-attachment').each do |node|
      image_url = node['url']
      image_width = node['width']
      image_height = node['height']
      caption = node['caption']
      plain_html = "<figure class=\"attachment\">\n"
      plain_html += "  <img src=\"#{image_url}\" style=\"width: #{image_width}px, height: #{image_height}px\" />"
      plain_html += "    <div class=\"flex\" style=\"justify-content: center\">\n"
      plain_html += "       <div class=\"text-sm text-white-op-50\">#{caption}</div>\n"
      plain_html += "    </div>\n"
      plain_html += "</figure>"
      node.replace plain_html
    end
    doc.to_s
        
  end

  # After active storage urls are changed, use this to recreate all trix attachments
  def self.refresh_trixes
    ActionText::RichText.where.not(body: nil).find_each do |trix|
      Description.refresh_trix(trix)
    end
  end

  # After active storage urls are changed, use this to recreate a specific trix attachments
  def self.refresh_trix(trix)
    return unless trix.embeds.size.positive?

    trix.body.fragment.find_all("action-text-attachment").each do |node|
      embed = trix.embeds.find { |attachment| attachment.filename.to_s == node["filename"] && attachment.byte_size.to_s == node["filesize"] }

      node.attributes["url"].value = Rails.application.routes.url_helpers.rails_storage_redirect_url(embed.blob, host: "open-tss.net")
      node.attributes["sgid"].value = embed.attachable_sgid
    end

    trix.update_column :body, trix.body.to_s
  end


end
