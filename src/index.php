<!DOCTYPE html>
<html lang="en">
    <head>
        <?php
            include('php/utils.php');
            include('php/defines.php');
            $filePath = '';
            $uri = explode('/', strtolower(trim($_SERVER['REQUEST_URI'], '/')));
            if(!empty($uri)) {
                $mode = get_const_if_defined('MODE_' . strtoupper($uri[0]));
                if($mode != MODE_UNKNOWN && count($uri) > 1 &&
                   (array_search($uri[0] . '_' . $uri[1], CONV_OR_CALC_TYPES) !== false)) { 
                    $filePath .= $uri[0] . '/' . ($type = $uri[1]);
                } else {
                    if($mode == MODE_CALCULATOR && empty($uri[1])) {
                        $filePath .= $uri[0] . '/' . ($type = 'standard');
                    } else {
                        $type = CONV_OR_CALC_TYPE_UNKNOWN;
                    }
                }
            } else {
                $mode = MODE_UNKNOWN;
                $type = CONV_OR_CALC_TYPE_UNKNOWN;
            }
        ?>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/common.css">
        <link rel="stylesheet" href="/style.css">
        <?php
            if($mode != MODE_UNKNOWN &&
               $type != CONV_OR_CALC_TYPE_UNKNOWN &&
               !empty($filePath)) {
                echo '<link rel="stylesheet" href="/css/' . $filePath . '.css">';
            }
        ?>
        <title>
            <?php
                if($mode == MODE_UNKNOWN || $type == CONV_OR_CALC_TYPE_UNKNOWN) {
                    echo 'Simple calculator';
                } else {
                    echo ucfirst("$uri[0] | " . ucfirst(str_replace('-', ' ', $type)));
                }
            ?>
        </title>
    </head>
    <body onresize="closeAllOpenOverlayItems()">
        <div class="main-container">
            <div class="calc-content">    
                <div class="calc-row top-bar">
                    <button class="menu-toggle-button"
                            onclick="toggleOverlayItem('menu',
                                                       {closeOverlayOnClick: true})"
                            windows-icon>&#xe700; <!--menu--> </button>
                    <div id="top-bar-title" class="top-bar-title">
                        <?php
                            if($type != CONV_OR_CALC_TYPE_UNKNOWN) {
                                echo ucfirst(str_replace('-', ' ', $type));
                            }
                        ?>
                    </div>
                    <button id="history-button"
                            class="transparent-button"
                            onclick="toggleOverlayItem('history-container-overlay',
                                                       {closeOverlayOnClick: true, overlayClass: 'dark-overlay-container'})"
                            windows-icon>&#xE81C; <!--history--> </button>
                </div>
                <div class="calc-dynamic-content">
                    <?php
                        if($mode != MODE_UNKNOWN &&
                        $type != CONV_OR_CALC_TYPE_UNKNOWN &&
                        !empty($filePath)) {
                            include("html/$filePath.html");
                        }
                    ?>
                </div>
            </div>
            <div class="history-memory-container">
                
            </div>
        </div>
        <div id="overlay-container"
             class="overlay-container"
             onclick="overlayClickHandler(event)">
            <?php
                include('html/menu.html');
            ?>
        </div>
    </body>
    <script src="/assets/js/jquery.min.js"></script>
    <script src="/js/utils.js"></script>
    <script src="/js/common.js"></script>
    <script src="/main.js"></script>
    <?php
        if( $mode != MODE_UNKNOWN &&
            $type != CONV_OR_CALC_TYPE_UNKNOWN &&
            !empty($filePath)) {
            echo '<script src="/js/' . $filePath . '.js"></script>';
        }
    ?>
</html>