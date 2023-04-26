
Dropzone.autoDiscover = false;
var currentFile = null;
const myDropzone = new Dropzone("#MyDropZone",{

    url: 'upload/',
    maxFiles: 1,
    maxFilesize: 2,
    acceptedFiles: '.docx',
    addRemoveLinks: true,

    init: function(){
        // Hide the chart containers initially
        $('#bar-chart-container').hide();
        $('#pie-chart-container').hide();

        this.on('addedfile',function(file,response){
            if (currentFile){
                this.removeFile(currentFile)
                }
            currentFile = file;
        })/*end of added file*/

        this.on('success',function(file,response)
        {
                console.log(response)
                $('#Total_Number').html(`<span style="font-size: 1.2em; font-color:black; font-weight: bold;">Total Number of Words in the Uploaded Document: ${response['total_words_counter']}</span>`);

                $('#table_title').text(`Most Frequent Words in Uploaded File`);
                $('.WordsTable').empty();
                $('.WordsTable').css({'visibility':"visible"});
                $('.WordsTable').append(`<tr><th>Word</th><th>Count</th></tr>`);
                for(const [key,value] of Object.entries(response['words_dict']))        {
                    $('.WordsTable').append(`<tr><td>${key}</td><td>${value}</td></tr>`);
                }

                var colors = [];

                for (var i=0; i < Object.keys(response['words_dict']).length; i++){
                    colors.push('#'+(Math.random().toString(16)).slice(2,8));
                }

                const ctx = document.getElementById('WordChart').getContext('2d');
                new Chart(ctx,{
                    type: "bar",
                    data:
                    {
                        labels: Object.keys(response['words_dict']),
                        datasets:[{
                            backgroundColor : colors,
                            data: Object.values(response['words_dict']),
                        }
                    ]
                    },
                    options:{
                        legend:{ display:false},
                        title:{
                            display:true,
                            text:'Bar Chart',
                        }
                    }
                });


                const piecht = document.getElementById('PieChart').getContext('2d');
                new Chart(piecht,{
                    type: "pie",
                    data:
                    {
                        labels: Object.keys(response['words_dict']),
                        datasets:[{
                            backgroundColor : colors,
                            data: Object.values(response['words_dict']),
                        }
                    ]
                    },
                    options:{
                        title:{
                            display:true,
                            text:'Pie Chart',
                        }
                    }
                });

                  // Add an event listener to the chart select dropdown
                  const pieChartContainer = document.getElementById('pie-chart-container');
                  const barChartContainer = document.getElementById('bar-chart-container');

                  $('#chart-type').on('change', function() {
                    // Get the selected value from the dropdown
                    const selectedValue = $(this).val();

                    // Hide the chart containers initially
                    $('#bar-chart-container').hide();
                    $('#pie-chart-container').hide();


                    // Show the selected chart container and update the chart type
                    if (selectedValue === 'pie') {
                      pieChartContainer.style.display = 'block';
                      barChartContainer.style.display = 'none';
                      chart.destroy();
                      chart = pieChart;
                    } else if (selectedValue === 'bar') {
                      barChartContainer.style.display = 'block';
                      pieChartContainer.style.display = 'none';
                      chart.destroy();
                      chart = barChart;
                    }
                  });
        })/*end of success event*/

        this.on('removedfile',function(file,response){
        /*Clear screen*/

                $('#Total_Number').text(``);
                $('#table_title').text(``);
                $('.WordsTable').css({'visibility':"hidden"});

                /*Removing previous charts*/
                $('WordChart').remove();
                $('#bar-chart-container').html( '<canvas id="WordChart"></canvas>');

                $('PieChart').remove();
                $('#pie-chart-container').html( '<canvas id="PieChart"></canvas>');
        })//end of
    }//end of init
})
