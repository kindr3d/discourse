require 'rails_helper'

describe Admin::StatsController do

  it "is a subclass of AdminController" do
    expect(Admin::StatsController < Admin::AdminController).to eq(true)
  end

end
