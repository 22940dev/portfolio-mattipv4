<?php
/**
 *  Personal Site: My humble personal homepage, made with a tiny bit but not much care.
 *  <https://github.com/MattIPv4/Personal-Site/>
 *  Copyright (C) 2018 Matt Cowley (MattIPv4) (me@mattcowley.co.uk)
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

$name = "Matt Cowley";

$motto = [];
$motto[] = "Website designer and developer. Digital graphic designer.";
$motto[] = "Theatre technician (Stage management, electrics, lighting).";

$links = [];
$links[] = "cv.mattcowley.co.uk";
$links[] = "botz.mattcowley.co.uk";
$links[] = "github.mattcowley.co.uk";
$links[] = "discord.mattcowley.co.uk";
$links[] = "patreon.mattcowley.co.uk";
$links[] = "twitter.mattcowley.co.uk";

foreach ($links as $i => $v) {
    $links[$v] = "http://".$v."/";
    unset($links[$i]);
}

function doToolMap($tools, $delim = " / ")
{
    $tool_map = [
        "phpstorm" => "devicon-phpstorm-plain",

        "webstorm" => "devicon-webstorm-plain",

        "php" => "devicon-php-plain",

        "html" => "devicon-html5-plain",

        "js" => "devicon-javascript-plain",

        "js (es6)" => "devicon-javascript-plain",

        "jquery" => "devicon-jquery-plain",

        "css" => "devicon-css3-plain",

        "bootstrap" => "devicon-bootstrap-plain",

        "mysql" => "devicon-mysql-plain",

        "laravel" => "devicon-laravel-plain",

        "git" => "devicon-git-plain",

        "python" => "devicon-python-plain",

        "pycharm" => "devicon-pycharm-plain",

        "photoshop" => "devicon-photoshop-plain",
    ];
    $final = [];
    foreach ($tools as $tool) {
        if (array_key_exists(strtolower($tool), $tool_map)) {
            $final[] = "<i class=\"" . $tool_map[strtolower($tool)] . "\"><span class=\"tip\">" . $tool . "</span></i>";
        } else {
            $final[] = $tool;
        }
    }
    return implode($delim, $final);
}

require_once "spyc.php";
$projects = Spyc::YAMLLoad(file_get_contents(dirname(__FILE__)."/projects.yaml"));

if (isset($_GET['e'])) {
    $json = [
        'name' => $name,
        'motto' => $motto,
        'links' => $links,
        'projects' => $projects
    ];

    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    echo json_encode($json, JSON_PRETTY_PRINT);
}
