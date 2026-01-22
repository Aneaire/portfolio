# API Integration Interview Q&A

## Fundamentals

### Q1: Explain REST API principles and how you apply them in your work.
**Answer:**
REST (Representational State Transfer) principles:

1. **Stateless**: Each request contains all necessary information
2. **Client-Server**: Separation of concerns between UI and data
3. **Cacheable**: Responses indicate if they can be cached
4. **Uniform Interface**: Consistent resource identification and manipulation
5. **Layered System**: Client doesn't know if connected directly to server

**How I apply them:**
- Use proper HTTP methods (GET read, POST create, PUT/PATCH update, DELETE remove)
- Design intuitive resource URLs (`/users/{id}/orders`)
- Return appropriate status codes (200, 201, 400, 401, 404, 500)
- Version APIs (`/api/v1/`) for backward compatibility
- Use consistent response structures with proper error messages

---

### Q2: Walk through how you would integrate a payment gateway like Stripe or Paymongo.
**Answer:**
**Stripe Integration Process:**

1. **Setup**:
   - Install SDK: `npm install stripe`
   - Configure API keys in environment variables
   - Set up webhook endpoint for async events

2. **Client-side**:
   - Use Stripe Elements for secure card input
   - Create Payment Intent on server
   - Confirm payment on client

3. **Server-side**:
   ```typescript
   // Create payment intent
   const paymentIntent = await stripe.paymentIntents.create({
     amount: 1000, // cents
     currency: 'usd',
     metadata: { orderId: order.id }
   });
   ```

4. **Webhook handling**:
   - Verify webhook signatures
   - Handle `payment_intent.succeeded`, `payment_intent.failed`
   - Update order status, send confirmation

5. **Security**:
   - Never log full card details
   - Use HTTPS only
   - Validate webhook signatures
   - Implement idempotency keys

---

### Q3: How do you handle API authentication and authorization?
**Answer:**
**Common patterns I use:**

1. **API Keys**: Simple, for server-to-server communication
   - Store in environment variables
   - Pass in headers: `Authorization: Bearer <key>`

2. **OAuth 2.0**: For user-authorized access
   - Implement authorization code flow for web apps
   - Handle token refresh automatically

3. **JWT**: For session management
   - Short-lived access tokens (15 min)
   - Longer-lived refresh tokens
   - Store securely (httpOnly cookies preferred)

**Best practices:**
- Never expose secrets in client-side code
- Implement proper token rotation
- Use HTTPS exclusively
- Validate tokens on every request
- Implement rate limiting

---

### Q4: How do you handle errors from external APIs?
**Answer:**
**Error handling strategy:**

```typescript
async function callExternalAPI(data: RequestData) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Handle HTTP errors
      const error = await response.json();
      throw new APIError(response.status, error.message);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      // Known API errors - handle based on status
      if (error.status === 429) return handleRateLimit();
      if (error.status === 401) return refreshAndRetry();
    }
    // Network errors, timeouts
    logger.error('API call failed', { error, data });
    throw new ServiceUnavailableError();
  }
}
```

**Key practices:**
- Distinguish between client errors (4xx) and server errors (5xx)
- Implement retry logic with exponential backoff
- Provide meaningful error messages to users
- Log errors with context for debugging
- Use circuit breakers for unreliable services

---

### Q5: Explain how you would design an API wrapper/client library.
**Answer:**
**Design principles:**

```typescript
class PaymentClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: ClientConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.example.com';
  }

  // Type-safe method with proper error handling
  async createPayment(data: CreatePaymentInput): Promise<Payment> {
    return this.request<Payment>('POST', '/payments', data);
  }

  private async request<T>(method: string, path: string, data?: unknown): Promise<T> {
    // Centralized request logic with auth, error handling, retries
  }
}
```

**Key features:**
- Type safety with TypeScript
- Centralized authentication
- Consistent error handling
- Request/response logging
- Automatic retries
- Rate limit handling
- Easy to test with dependency injection

---

## Real-World Scenarios

### Q6: How would you integrate multiple third-party services that need to stay in sync?
**Answer:**
**Example: E-commerce with CRM, Inventory, Shipping**

**Architecture:**
1. **Event-driven approach**: Central event bus (or workflow tool like N8N)
2. **Single source of truth**: One system owns each data type
3. **Eventual consistency**: Accept that sync takes time
4. **Idempotent operations**: Safe to retry without duplicates

**Implementation:**
```
Order Created (Primary DB)
    |
    ├── Webhook → N8N Workflow
    |       |
    |       ├── Create CRM contact/deal
    |       ├── Reserve inventory
    |       ├── Create shipping label
    |       └── Send confirmation email
    |
    └── Log sync status for monitoring
```

**Handling failures:**
- Retry failed operations
- Dead letter queue for persistent failures
- Manual reconciliation dashboard
- Alerts for sync delays

---

### Q7: How do you approach API versioning?
**Answer:**
**Strategies:**

1. **URL versioning** (my preferred): `/api/v1/users`
   - Clear and explicit
   - Easy to route at infrastructure level

2. **Header versioning**: `Accept: application/vnd.api+json;version=1`
   - Cleaner URLs
   - More complex to implement

3. **Query parameter**: `/users?version=1`
   - Simple but less elegant

**Deprecation process:**
1. Announce deprecation with timeline (3-6 months)
2. Add deprecation headers to old version responses
3. Monitor usage of old versions
4. Provide migration guides
5. Sunset old version with clear communication

---

### Q8: How do you optimize API performance?
**Answer:**
**Techniques I use:**

1. **Caching**:
   - Redis for frequently accessed data
   - HTTP cache headers (ETag, Cache-Control)
   - Request deduplication

2. **Efficient queries**:
   - Pagination for large datasets
   - Field selection (`?fields=id,name`)
   - Eager loading to avoid N+1 queries

3. **Batching**:
   - Accept bulk operations
   - GraphQL for complex data needs

4. **Infrastructure**:
   - CDN for static responses
   - Connection pooling
   - Compression (gzip)

5. **Monitoring**:
   - Track response times (p50, p95, p99)
   - Identify slow endpoints
   - Alert on degradation

---

### Q9: Describe how you've integrated map services (like Mapbox) in applications.
**Answer:**
**Mapbox Integration approach:**

1. **Setup**:
   - Secure API token management
   - Load map library efficiently (lazy load when needed)

2. **Implementation**:
   ```typescript
   // React component example
   const MapView = ({ locations }) => {
     useEffect(() => {
       const map = new mapboxgl.Map({
         container: 'map',
         style: 'mapbox://styles/mapbox/streets-v11',
         center: [lng, lat],
         zoom: 12
       });

       // Add markers for locations
       locations.forEach(loc => {
         new mapboxgl.Marker()
           .setLngLat([loc.lng, loc.lat])
           .addTo(map);
       });
     }, [locations]);
   };
   ```

3. **Optimization**:
   - Cluster markers for large datasets
   - Use vector tiles for performance
   - Implement viewport-based loading
   - Cache geocoding results

4. **Features I've built**:
   - Store locators with search
   - Delivery tracking with real-time updates
   - Route visualization

---

### Q10: How do you test API integrations?
**Answer:**
**Testing strategy:**

1. **Unit tests**: Mock external APIs
   ```typescript
   jest.mock('./stripe-client');
   test('creates payment successfully', async () => {
     mockStripeClient.createPayment.mockResolvedValue({ id: 'pi_123' });
     const result = await orderService.processPayment(order);
     expect(result.paymentId).toBe('pi_123');
   });
   ```

2. **Integration tests**: Test against sandbox/test environments
   - Stripe test mode
   - Mapbox testing tokens

3. **Contract tests**: Ensure API changes don't break consumers
   - Define expected request/response schemas
   - Validate against actual API responses

4. **End-to-end tests**: Full flow validation
   - Create test accounts/data
   - Verify complete user journeys

5. **Monitoring in production**:
   - Track success/failure rates
   - Alert on unexpected response patterns
   - Log for debugging
