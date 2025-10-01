require "test_helper"

class MovimentacoesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get movimentacoes_index_url
    assert_response :success
  end
end
