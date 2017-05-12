module.exports = function(grunt) {

  grunt.initConfig({
    less: {
      static_mappings: {
        options: {
          plugins: [
            new (require('less-plugin-clean-css'))()
          ],
        },
        files: [
          {
            src: 'less/page.less',
            dest: 'css/page.css'
          }, 
          {
            src: 'less/test.less',
            dest: 'css/test.css'
          }, 
        ]
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')
        ],
      },
      dist: {
        src: 'css/*.css'
      }
    },
    watch: {
      files: ['less/*.less', 'less/**/*.less'],
      tasks: ['less', 'postcss']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('default', ['less', 'watch']);

};
