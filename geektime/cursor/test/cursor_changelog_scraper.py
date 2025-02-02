import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

def scrape_cursor_changelog():
    # URL of the changelog
    url = 'https://www.cursor.com/changelog'
    
    try:
        # Send GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Initialize list to store changelog entries
        changelog_entries = []
        
        # Find all version sections
        version_sections = soup.find_all(['h1', 'h2', 'h3'])
        
        for section in version_sections:
            # Get the version title and date
            title = section.get_text().strip()
            
            # Get the content following this section until the next section
            content = []
            next_element = section.find_next_sibling()
            
            while next_element and next_element.name not in ['h1', 'h2', 'h3']:
                if next_element.name in ['p', 'ul', 'li']:
                    content.append(next_element.get_text().strip())
                next_element = next_element.find_next_sibling()
            
            # Create entry dictionary
            entry = {
                'title': title,
                'content': '\n'.join(content)
            }
            
            changelog_entries.append(entry)
        
        # Save to file
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'cursor_changelog_{timestamp}.json'
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(changelog_entries, f, ensure_ascii=False, indent=2)
            
        print(f'Successfully scraped changelog and saved to {filename}')
        return True
        
    except requests.RequestException as e:
        print(f'Error fetching the webpage: {e}')
        return False
    except Exception as e:
        print(f'An error occurred: {e}')
        return False

if __name__ == '__main__':
    scrape_cursor_changelog() 