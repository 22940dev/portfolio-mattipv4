/**
 *  Personal Site: My humble personal homepage, made with a tiny bit but not much care.
 *  <https://github.com/MattIPv4/Personal-Site/>
 *  Copyright (C) 2019 Matt Cowley (MattIPv4) (me@mattcowley.co.uk)
 *
 *  This program is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published
 *   by the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *  This program is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License
 *   along with this program. If not, please see
 *   <https://github.com/MattIPv4/Personal-Site/blob/master/LICENSE.md> or <http://www.gnu.org/licenses/>.
 */

const { readFileSync, writeFileSync } = require('fs');
const { parse } = require('yaml');
const md = require('markdown-it')();

const toolMap = {
    'phpstorm': 'devicon-phpstorm-plain',
    'webstorm': 'devicon-webstorm-plain',
    'pycharm': 'devicon-pycharm-plain',
    'rubymine': 'devicon-rubymine-plain',

    'php': 'fab fa-php',
    'html': 'fab fa-html5',

    'js': 'fab fa-js',
    'javascript': 'fab fa-js',
    'js (es6)': 'fab fa-js',
    'javascript (es6)': 'fab fa-js',

    'nodejs': 'fab fa-node-js',
    'vuejs': 'fab fa-vuejs',

    'typescript': 'devicon-typescript-plain',
    'webpack': 'devicon-webpack-plain',
    'babel': 'devicon-babel-plain',

    'jquery': 'devicon-jquery-plain',

    'css': 'fab fa-css3',
    'css3': 'fab fa-css3',
    'sass': 'fab fa-sass',

    'bootstrap': 'fab fa-bootstrap',

    'mysql': 'devicon-mysql-plain',
    'laravel': 'devicon-laravel-plain',
    'rails': 'devicon-rails-plain',

    'git': 'devicon-git-plain',
    'github': 'fab fa-github',

    'python': 'fab fa-python',

    'photoshop': 'devicon-photoshop-plain',

    'twitter': 'fab fa-twitter',
    'discord': 'fab fa-discord',
    'discourse': 'fab fa-discourse',
    'slack': 'fab fa-slack'
};

const yaml = parse(readFileSync('projects.yaml', 'utf8'));
const projects = Object.keys(yaml).map(key => {
    const data = yaml[key];
    // Name
    data.name = key;

    // Icons
    data.icons = data.tools.map(tool => {
        const key = tool.toString().toLowerCase();
        if (!(key in toolMap)) return tool;
        return {
            "classes": toolMap[key],
            "name": tool
        };
    });

    // Markdown
    data.desc = md.renderInline(data.desc).replace(/<a (.+?)>/g, '<a $1 target="_blank" rel="noopener">');

    return data;
}).filter(x => x.display);

const posthtml = require('posthtml');
const expressions = require('posthtml-expressions');
const include = require('posthtml-include');

const html = readFileSync('templates/index.html', 'utf8');

posthtml([
    include({ encoding: 'utf8' }),
    expressions({ locals: { projects } }),
])
    .process(html)
    .then((result) => writeFileSync('build/index.html', result.html, { flag: 'w+' }));
