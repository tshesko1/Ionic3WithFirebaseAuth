import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
// Used in Provider : src/provider/fbase-service.ts
import 'rxjs/add/operator/take';

platformBrowserDynamic().bootstrapModule(AppModule);
