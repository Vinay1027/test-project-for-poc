(function () {
  "use strict";
  var SearchJK = function (elem) {
    var self = this;
    this.initVariables = function () {
      this.$elem = $(elem);
      console.log("Inside Init Variables ", this.$elem);
      this.$search = $('.searchBtn');
      this.searchPath = '/content';
      this.$tableDataContainer = this.$elem.find('.table-container tbody');
    };
    this.bindEvents = function () {
      self.$search.click(function () {
        this.searchTerm = $('#searchTerm').val();
        console.log("Button Clicked so making an ajax call..");
        $.ajax({
          type: 'GET',
          url: '/bin/searchdk.json?searchPath=' + self.searchPath + '&searchTerm=' + this.searchTerm,
          success: function (data) {
            let resultData = JSON.parse(data);
            if (resultData.results.length > 0) {
              console.log(resultData.results);
              self.$tableDataContainer.empty();
              var searchResultDataList = [];
              var tableHeader = `<tr style="display: table-row;vertical-align: inherit;border-color: inherit;border-left: 0;border-right: 0;text-shadow: none !important;">
                <th style="width: 93px;border-right: none;font-size: 1rem;text-align: center;background: #F1ECE9;color: #333333;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;">
                   Select All <input type="checkbox"></th>
                <th style="border-left: none;background: #DBCFC7;color: #000;font-size: 1rem;width: 127px;cursor: pointer;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;">
                   Name</th>
                <th style="background: #F1ECE9;color: #333333;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;cursor: pointer;width: 380px;">
                   Description</th>
                <th style="width: 139px;cursor: pointer;background: #F1ECE9;color: #333333;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;">
                   Transaction Type</th>
                <th style="background: #F1ECE9;color: #333333;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;cursor: pointer;">
                   Form Number</th>
                <th style="background: #F1ECE9;color: #333333;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;cursor: pointer;">
                   State</th>
                <th style="background: #F1ECE9;color: #333333;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;cursor: pointer;">
                   Email</th>
             </tr>`;
              searchResultDataList.push(tableHeader);
              var list = resultData.results
              list.forEach((data) => {
                var searchResultData = `<tr>
                <td style="border-left: none;color: #000;font-size: 1rem;width: 127px;cursor: pointer;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;">
                   <input type="checkbox"></td>
                <td style="border-left: none;color: #000;font-size: 1rem;width: 127px;cursor: pointer;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;">
                   <a href="${data.path}.html">${data.title}</a></td>
                <td style="border-left: none;color: #000;font-size: 1rem;width: 127px;cursor: pointer;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;width: 380px">
                   Complete to file an accelerated benefit claim.</td>
                <td style="border-left: none;color: #000;font-size: 1rem;width: 127px;cursor: pointer;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;">
                   Claims</td>
                <td style="border-left: none;color: #000;font-size: 1rem;width: 127px;cursor: pointer;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;">
                   Z1361 10/22</td>
                <td style="border-left: none;color: #000;font-size: 1rem;width: 127px;cursor: pointer;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;">
                   AK, AL, AR, AZ, CA</td>
                <td style="border-left: none;color: #000;font-size: 1rem;width: 127px;cursor: pointer;text-align: left;padding: 0 8px;height: 45px;border: 1px solid #cbcbcb;">
                   <input type="checkbox"></td>
             </tr>`;
                searchResultDataList.push(searchResultData);
              });
              self.$tableDataContainer.append(searchResultDataList);

            }
          }
        });
      });
    };
    this.init = function () {
      this.initVariables();
      this.bindEvents();
    };
    this.init();
  };
  $(document).ready(function () {
    $(".searchjk").each(function (i) {
      new SearchJK($(this));
    });
  });
})();
