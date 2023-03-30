require 'cgi'

class Description < ApplicationRecord
  has_rich_text :content
  has_many :companies_descriptions
  has_many :companies, :through => :companies_descriptions

  def conv_to_json
    {
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

end
