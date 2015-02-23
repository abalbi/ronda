module.exports = function(grunt) {
  var shell = require('shelljs');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['Gruntfile.js', '*.js', '*/*.js', '*/*/*.js', '*.json', '*/*.json', '*/*/*.json', '*/*.jade'],
      tasks: ['consequat-restart','waaiting','seeddb','test-api']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-wait');
  grunt.registerTask('test-api', function(){
    shell.exec('mocha');
  });
  grunt.registerTask('waaiting', function(){
    shell.exec('sleep 5');
  });
  grunt.registerTask('vagrant-up', function(){
    shell.exec('vagrant up');
  });
  grunt.registerTask('vagrant-destroy', function(){
    shell.exec('vagrant destroy -f');
  });
  grunt.registerTask('consequat-restart', function(){
    shell.exec('vagrant ssh -c "sudo service consequat restart"');
  });
  grunt.registerTask('seeddb', function(){
    shell.exec('vagrant ssh -c "cd /vagrant;seed"');
  });
  grunt.registerTask('start', ['vagrant-up','dev']);
  grunt.registerTask('dev', [
    'consequat-restart',
    'seeddb',
    'test-api',
    'watch'
  ]);
  grunt.registerTask('default', ['start']);
};