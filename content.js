// Function to add duration label to videos
function addVideoDurationLabels() {
  // Select all video elements on the page
  const videos = document.querySelectorAll('video');

  videos.forEach(video => {
    // Check if the video already has a duration label
    if (video.parentElement.querySelector('.video-duration-label')) return;

    // Get video duration
    video.addEventListener('loadedmetadata', () => {
      const duration = video.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);

      // Create a label
      const durationLabel = document.createElement('div');
      durationLabel.className = 'video-duration-label';
      durationLabel.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      durationLabel.style.position = 'absolute';
      durationLabel.style.bottom = '10px';
      durationLabel.style.right = '10px';
      durationLabel.style.padding = '5px 10px';
      durationLabel.style.background = 'rgba(0, 0, 0, 0.7)';
      durationLabel.style.color = 'white';
      durationLabel.style.fontSize = '12px';
      durationLabel.style.borderRadius = '5px';
      durationLabel.style.zIndex = '1000';

      // Ensure the video's parent container is positioned for absolute positioning
      const parent = video.parentElement;
      if (getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }

      // Append the label
      parent.appendChild(durationLabel);
    });
  });
}

// Observe changes in the DOM to detect new videos
const observer = new MutationObserver(() => {
  addVideoDurationLabels();
});
observer.observe(document.body, { childList: true, subtree: true });

// Run the function initially
addVideoDurationLabels();
