import time
import pyautogui  # Install with: pip install pyautogui
import random
import winsound  # Built-in Windows module for playing sounds

def play_notification_sound():
    # Play a sound notification (frequency=1000, duration=500ms)
    winsound.Beep(1000, 500)
    print(f"Sound notification played at {time.strftime('%H:%M:%S')}")

def get_random_message():
    messages = [
  "Ultrathink and fix errors on my existing files codes by following the next js 15 app router version and typescript docs and do not duplcate files or codes",
]
    return random.choice(messages)

def get_first_click_coordinates():
    # Get screen dimensions
    screen_width, screen_height = pyautogui.size()
    
    # Calculate coordinates for the first click position
    x = int(screen_width * 0.800)  # 80.0% from the left
    y = int(screen_height * 0.260)  # 26.0% from the top
    
    return x, y

def get_second_click_coordinates():
    # Get screen dimensions
    screen_width, screen_height = pyautogui.size()
    
    # Calculate coordinates for the second click position
    x = int(screen_width * 0.800)  # 80.0% from the left
    y = int(screen_height * 0.750)  # 75.0% from the top
    
    return x, y

def run_automation_sequence():
    try:
        # STEP 1: First click at x=80%, y=26.0%
        first_x, first_y = get_first_click_coordinates()
        print(f"Moving mouse to first position: ({first_x}, {first_y}) at {time.strftime('%H:%M:%S')}")
        pyautogui.moveTo(first_x, first_y)
        pyautogui.click()
        
        # STEP 2: Wait 10 seconds
        print("Waiting 10 seconds...")
        time.sleep(10)
        
        # STEP 3: Enter text (a random message)
        message = get_random_message()
        print(f"Typing '{message}' slowly at {time.strftime('%H:%M:%S')}")
        pyautogui.typewrite(message, interval=0.1)  # 0.1 second delay between each character
        
        # STEP 4: Wait 10 seconds
        print("Waiting 10 seconds...")
        time.sleep(10)
        
        # STEP 5: Press Enter
        print(f"Pressing Enter at {time.strftime('%H:%M:%S')}")
        pyautogui.press("enter")
        
        # STEP 6: Wait 11 minutes (660 seconds)
        print(f"Waiting 11 minutes... Will continue at approximately {time.strftime('%H:%M:%S', time.localtime(time.time() + 660))}")
        time.sleep(660)
        
        # STEP 7: Click at x=80%, y=75.0%
        second_x, second_y = get_second_click_coordinates()
        print(f"Moving mouse to second position: ({second_x}, {second_y}) at {time.strftime('%H:%M:%S')}")
        pyautogui.moveTo(second_x, second_y)
        pyautogui.click()
        
        # STEP 8: Wait 10 seconds
        print("Waiting 10 seconds...")
        time.sleep(10)
        
        # STEP 9: Press Ctrl+N
        print(f"Pressing Ctrl+N at {time.strftime('%H:%M:%S')}")
        pyautogui.hotkey('ctrl', 'n')
        
        # STEP 10: Wait 10 seconds
        print("Waiting 10 seconds...")
        time.sleep(30)
        
        # After this, the sequence will repeat from the beginning (STEP 1)
            
    except Exception as e:
        print(f"An error occurred during automation sequence: {repr(e)}")
        print("Make sure your screen is accessible for mouse movements.")

print("Script started. Press Ctrl+C to stop the script.")
print("The script will move to calculated screen coordinates based on your screen size.")
print("Following sequence:")
print("1. Click at x=80%, y=26.0%")
print("2. Wait 10 seconds")
print("3. Enter text")
print("4. Wait 10 seconds")
print("5. Press Enter")
print("6. Wait 11 minutes")
print("7. Click at x=80%, y=75.0%")
print("8. Wait 10 seconds")
print("9. Press Ctrl+N")
print("10. Wait 10 seconds")
print("11. Repeat from step 1 (infinite loop)")

try:
    while True:
        # Play notification sound before starting sequence
        play_notification_sound()
        
        # Run the automation sequence
        run_automation_sequence()
        
except KeyboardInterrupt:
    print("\nScript terminated by user.") 