json.merge! project.attributes
json.sent_to "Addressing: #{pluralize(project.clients.length, 'Client', 'Clients')}"
json.pages project.pages do |page|
  json.merge! page.attributes
end
