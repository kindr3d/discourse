require 'rails_helper'

describe Admin::StatsController do

  it "is a subclass of AdminController" do
    expect(Admin::StatsController < Admin::AdminController).to eq(true)
  end

  context 'while logged in as an admin' do
    let!(:admin) { log_in(:admin) }
    let(:user) { Fabricate(:user) }

    context "and wrong time parameter is passed" do
      let(:invalid_time) { "year" }

      it "returns 404" do
        xhr :get, :index, time: invalid_time
        expect(response.status).to eq(404)
      end

    end

    context "and valid time parameter is passed" do
      before do
        xhr :get, :index, time: ["today", "week", "month"].sample
        @parsed_response = JSON.parse(response.body)
      end

      it "response is succesful" do
        expect(response).to be_success
      end

      it "and renders as JSON" do
        expect(@parsed_response).to be_present
      end

      it "and visits total is a hash" do
        expect(@parsed_response["visit_total"]).to be_kind_of(Hash)
      end

      it "and visit count is an integer" do
        expect(@parsed_response["visit_total"]["total"]).to be_kind_of(Float)
      end

    end

  end

end
