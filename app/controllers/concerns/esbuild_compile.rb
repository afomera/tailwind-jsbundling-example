module EsbuildCompile
  extend ActiveSupport::Concern

  included do
    before_action :esbuild_compile, unless: :esbuild_running? if Rails.env.development?
  end

  def esbuild_compile
    system("yarn run build")
  end

  def esbuild_running?
    File.exists?(Rails.root.join("tmp", "pids", "esbuild.pid"))
  end
end
