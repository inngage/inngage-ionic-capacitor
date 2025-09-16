require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json'))) rescue {}

repo_url = nil
if package['repository'].is_a?(Hash)
  repo_url = package['repository']['url']
elsif package['repository'].is_a?(String)
  repo_url = package['repository']
end
repo_url ||= 'https://example.com/inngageregistry/inngage-ionic-capacitor.git'

Pod::Spec.new do |s|
  s.name            = 'InngageregistryInngageIonicCapacitor'
  s.version         = package['version'] || '1.0.0'
  s.summary         = package['description'] || 'Inngage Ionic Capacitor SDK (mobile-only).'
  s.license         = package['license'] || { :type => 'MIT' }
  s.homepage        = package['homepage'] || repo_url
  s.author          = package['author'] || { 'Inngage' => 'dev@inngage.com' }
  s.source          = { :git => repo_url, :tag => s.version.to_s }

  s.ios.deployment_target = '14.0'
  s.swift_version   = '5.9'
  s.static_framework = true

  s.source_files    = 'ios/Plugin/**/*.{swift,h,m,mm}'
  s.dependency 'Capacitor', '~> 7.0'
end