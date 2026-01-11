 // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            setupEmergencyPage();
        });

        // Setup emergency page functionality
        function setupEmergencyPage() {
            // Tab functionality for emergency procedures
            const tabs = document.querySelectorAll('.procedure-tab');
            const procedureContents = {
                'fire': document.getElementById('fire-procedure'),
                'medical': document.getElementById('medical-procedure')
            };

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    // Remove active class from all tabs
                    tabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    this.classList.add('active');
                    
                    // Get the procedure type
                    const procedureType = this.getAttribute('data-procedure');
                    
                    // Hide all procedure contents
                    Object.values(procedureContents).forEach(content => {
                        if (content) content.style.display = 'none';
                    });
                    
                    // Show selected procedure content
                    if (procedureContents[procedureType]) {
                        procedureContents[procedureType].style.display = 'block';
                    }
                    
                    // For demo purposes, we'll just show fire or medical
                    // In a full implementation, you would have content for all procedures
                    if (!procedureContents[procedureType]) {
                        // Show fire procedure as default for other tabs
                        procedureContents['fire'].style.display = 'block';
                    }
                });
            });

            // Location selection in map section
            const locationItems = document.querySelectorAll('.location-item');
            locationItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Remove active class from all items
                    locationItems.forEach(i => i.classList.remove('active'));
                    
                    // Add active class to clicked item
                    this.classList.add('active');
                    
                    // In a real implementation, this would update the map
                    const locationType = this.getAttribute('data-location');
                    console.log(`Selected location: ${locationType}`);
                    // You would update the map here
                });
            });

            // Make emergency numbers clickable on mobile
            const emergencyNumbers = document.querySelectorAll('.action-number, .contact-number');
            emergencyNumbers.forEach(number => {
                // Extract phone number from text
                const text = number.textContent;
                const phoneNumber = text.replace(/\D/g, '');
                
                if (phoneNumber.length >= 7) {
                    number.style.cursor = 'pointer';
                    number.addEventListener('click', function() {
                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            window.location.href = `tel:${phoneNumber}`;
                        } else {
                            // For desktop, show a message
                            alert(`Call ${text} for emergency assistance`);
                        }
                    });
                }
            });

            // Emergency call buttons
            const callButtons = document.querySelectorAll('.action-btn');
            callButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    if (!this.getAttribute('href').startsWith('tel:')) {
                        e.preventDefault();
                        const numberText = this.previousElementSibling.textContent;
                        const phoneNumber = numberText.replace(/\D/g, '');
                        
                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            window.location.href = `tel:${phoneNumber}`;
                        } else {
                            alert(`For emergency assistance, please call: ${numberText}`);
                        }
                    }
                });
            });

            // Add pulse animation to emergency numbers every 10 seconds
            setInterval(() => {
                const pulseNumber = document.querySelector('.emergency-pulse');
                pulseNumber.classList.remove('emergency-pulse');
                void pulseNumber.offsetWidth; // Trigger reflow
                pulseNumber.classList.add('emergency-pulse');
            }, 10000);
        }

        // Function to simulate emergency call (for demo purposes)
        function simulateEmergencyCall(service, number) {
            alert(`Simulating call to ${service} at ${number}\n\nIn a real implementation, this would dial: ${number}`);
            
            // In a real app, you would use:
            // window.location.href = `tel:${number}`;
        }