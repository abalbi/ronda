module.exports = function(grunt) {
  var shell = require('shelljs');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      files: ['Gruntfile.js', '*.js', '*/*.js', '*/*/*.js', '*.json', '*/*.json', '*/*/*.json', '*/*.jade'],
      tasks: ['ronda-restart','waaiting','seeddb','test-api']
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
  grunt.registerTask('package-master', function(){
    shell.exec('cp package.json package.json.master');
  });
  grunt.registerTask('ronda-restart', function(){
    shell.exec('vagrant ssh -c "sudo service ronda restart"');
  });
  grunt.registerTask('seeddb', function(){
    shell.exec('vagrant ssh -c "cd /vagrant;node seeddb.js"');
  });
  grunt.registerTask('start', ['vagrant-up','dev']);
  grunt.registerTask('dev', [
    'package-master',
    'ronda-restart',
    'seeddb',
    'test-api',
    'watch'
  ]);
  grunt.registerTask('default', ['start']);
};