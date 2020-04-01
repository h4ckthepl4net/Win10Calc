<?php
function get_const_if_defined($constName) {
    return (defined($constName)) ? constant($constName) : -1;
}
?>