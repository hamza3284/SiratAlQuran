<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Asset Diagnostic Tool v2</h1>";
echo "<p><strong>Current Directory:</strong> " . __DIR__ . "</p>";

// 1. Check if we are inside a 'public' folder (Common Mistake)
if (basename(__DIR__) === 'public') {
    echo "<p style='color:orange'>[WARNING] You seem to be in a 'public' directory. Ensure your Document Root points here.</p>";
}

// 2. Check for the build directory
$buildDir = __DIR__ . '/build';
if (!is_dir($buildDir)) {
    echo "<h2 style='color:red'>[CRITICAL] 'build' folder is MISSING!</h2>";
    echo "<p>Expected at: <code>$buildDir</code></p>";
    
    // Check if it's nested in public/build
    if (is_dir(__DIR__ . '/public/build')) {
        echo "<p style='color:blue'>[HINT] Found 'public/build'. You need to move the 'build' folder <strong>UP</strong> one level.</p>";
    }
    exit;
} else {
    echo "<p style='color:green'>[OK] 'build' directory found.</p>";
}

// 3. Check Manifest
$manifestPath = $buildDir . '/manifest.json';
if (!file_exists($manifestPath)) {
    echo "<p style='color:red'>[ERROR] manifest.json is missing.</p>";
    exit;
}

$manifest = json_decode(file_get_contents($manifestPath), true);
if (!$manifest) {
    echo "<p style='color:red'>[ERROR] manifest.json is invalid JSON.</p>";
    exit;
}

// 4. Check specific assets
echo "<h3>Asset Check:</h3><ul>";
foreach ($manifest as $key => $item) {
    if (isset($item['file'])) {
        $realPath = $buildDir . '/' . $item['file'];
        $webPath = 'build/' . $item['file'];
        
        echo "<li>Checking <strong>{$item['file']}</strong>... ";
        
        if (file_exists($realPath)) {
            echo "<span style='color:green'>FILE EXISTS</span>";
            
            // Check Permissions
            $perms = substr(sprintf('%o', fileperms($realPath)), -4);
            echo " (Perms: $perms) ";
            
            if (!is_readable($realPath)) {
                echo "<span style='color:red'>NOT READABLE (Fix Perms to 644)</span>";
            } else {
                echo " <a href='$webPath' target='_blank'>[Try Open]</a>";
            }
        } else {
            echo "<span style='color:red'>FILE MISSING</span>";
        }
        echo "</li>";
    }
}
echo "</ul>";

echo "<h3>Next Steps</h3>";
echo "<ol>";
echo "<li>If files are <strong>MISSING</strong>: Re-upload the <code>build</code> folder.</li>";
echo "<li>If files are <strong>FOUND</strong> but 'Try Open' fails: Fix permissions (755 for folders, 644 for files).</li>";
echo "<li>If 'Try Open' shows Laravel 404 page: Your .htaccess is ignoring the file existence check.</li>";
echo "</ol>";
