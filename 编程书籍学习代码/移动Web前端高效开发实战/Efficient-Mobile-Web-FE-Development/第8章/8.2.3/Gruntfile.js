module.exports = function (grunt) {
    grunt.initConfig({
        // ����ͼƬ�ļ�������
        inline: {
            page: {
                src: ['index.html']
            }
        },
        // ѹ��CSS��JavaScript�ļ�������
        uglify: {
            dist: {
                files: {
                    'dist/js/album.min.js': ['src/js/album.js']
                }
            }
        },
        // ѹ��CSS�ļ�������
        cssmin: {
            dist: {
                files: {
                    'dist/css/reset.min.css': ['src/css/reset.css'],
                    'dist/css/album.min.css': ['src/css/album.css']
                }
            }
        },
        // �ϲ�����ļ�������
        concat: {
            dist: {
                src: ['dist/css/reset.min.css', 'dist/css/album.min.css'],
                dest: 'dist/css/all.min.css'
            }
        }
    });
    // ������Щ����
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Ĭ��ִ�е������б�
    grunt.registerTask('default', ['inline', 'uglify', 'cssmin', 'concat']);
};