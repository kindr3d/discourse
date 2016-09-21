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

      context "visit counts is valid " do

        it "and visits total is a hash" do
          expect(@parsed_response["visit_total"]).to be_kind_of(Hash)
        end

        it "and visit count is a float" do
          expect(@parsed_response["visit_total"]["total"]).to be_kind_of(Float)
        end

      end

      context "and visit data for bar chart" do

        it "is present as a hash" do
          expect(@parsed_response["visit_data"]).to be_kind_of(Array)
        end

        # it "and not empty" do
        #   expect(@parsed_response["visit_data"]).not_to be_empty
        # end

        # it "and visits value is valid" do
        #   expect(@parsed_response["visit_data"][0]).to be_kind_of(Fixnum)
        # end

      end

      context "and users data for bar chart" do

        it "is present as a hash" do
          expect(@parsed_response["user_data"]).to be_kind_of(Array)
        end

      end

    end

  end

end
